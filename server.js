/**
 * Custom Node server replacing `next start`/`next dev`'s built-in server, so
 * a WebSocket telemetry stream can live on the same HTTP server as the app
 * (needed because a raw WS upgrade doesn't go through Next's own router).
 *
 * Everything Next.js normally handles — routing, middleware, RSC — still
 * runs exactly as before via `handle()`; this file only adds the `upgrade`
 * listener and the simulation loop underneath it.
 *
 * NOTE: this only works against a persistent Node process (a VPS, Railway,
 * Fly.io, self-hosted, etc.). It will NOT work on Vercel or any other
 * serverless host — those don't support long-lived WebSocket connections.
 */

/* eslint-disable @typescript-eslint/no-require-imports -- plain CommonJS
   entrypoint, doesn't run through the Next.js compiler. */

const { createServer } = require("http");
const { parse } = require("url");
const next = require("next");
const { WebSocketServer } = require("ws");

const port = parseInt(process.env.PORT || "3000", 10);
const dev = process.env.NODE_ENV !== "production";
const app = next({ dev });
const handle = app.getRequestHandler();

const STREAM_PATH = "/api/dispatch/stream";
const TICK_MS = 3000;
const PROGRESS_STEP = 2;

// Real-world waypoints along the RN1 highway, Ouagadougou -> Bobo-Dioulasso —
// mirrors the OUAGA-BOBO-01 / Yutong T12 trip in src/lib/dispatch.ts.
const ROUTE_STATIONS = [
  { name: "Ouagadougou — Gare TRAME", lat: 12.3714, lng: -1.5197 },
  { name: "Koudougou", lat: 12.253, lng: -2.3623 },
  { name: "Boromo", lat: 11.7467, lng: -2.9298 },
  { name: "Houndé", lat: 11.4939, lng: -3.5172 },
  { name: "Bobo-Dioulasso", lat: 11.1772, lng: -4.2974 },
];

/** Linear interpolation of a 0-100 route progress value onto lat/lng. */
function interpolateRoute(progressPercent) {
  const segmentCount = ROUTE_STATIONS.length - 1;
  const scaled = (progressPercent / 100) * segmentCount;
  const segmentIndex = Math.min(Math.floor(scaled), segmentCount - 1);
  const segmentT = scaled - segmentIndex;

  const from = ROUTE_STATIONS[segmentIndex];
  const to = ROUTE_STATIONS[segmentIndex + 1];

  return {
    lat: from.lat + (to.lat - from.lat) * segmentT,
    lng: from.lng + (to.lng - from.lng) * segmentT,
  };
}

let gpsProgress = 0;

function nextTelemetryFrame() {
  gpsProgress = (gpsProgress + PROGRESS_STEP) % 101;
  const currentSpeed = 80 + Math.floor(Math.random() * 9); // 80-88 km/h
  const coordinates = interpolateRoute(gpsProgress);

  return JSON.stringify({
    tripId: "yutong-t12",
    currentSpeed,
    gpsProgress,
    coordinates,
  });
}

app.prepare().then(() => {
  const server = createServer((req, res) => {
    const parsedUrl = parse(req.url, true);
    handle(req, res, parsedUrl);
  });

  const wss = new WebSocketServer({ noServer: true });
  // Next's own dev-mode sockets (Turbopack HMR, etc.) also arrive as
  // `upgrade` events on this same server — anything that isn't our stream
  // path must be handed back to Next, not dropped.
  const nextUpgradeHandler = app.getUpgradeHandler();

  server.on("upgrade", (req, socket, head) => {
    const { pathname } = parse(req.url);

    if (pathname !== STREAM_PATH) {
      nextUpgradeHandler(req, socket, head);
      return;
    }

    wss.handleUpgrade(req, socket, head, (ws) => {
      wss.emit("connection", ws, req);
    });
  });

  wss.on("connection", (ws) => {
    console.log("[ws] dispatch client connected");
    ws.on("close", () => console.log("[ws] dispatch client disconnected"));
  });

  setInterval(() => {
    if (wss.clients.size === 0) return;

    const payload = nextTelemetryFrame();
    for (const client of wss.clients) {
      if (client.readyState === client.OPEN) client.send(payload);
    }
  }, TICK_MS);

  server.listen(port, () => {
    console.log(`> Ready on http://localhost:${port}`);
    console.log(`> Dispatch telemetry stream on ws://localhost:${port}${STREAM_PATH}`);
  });
});
