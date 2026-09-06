"use client";

import { useEffect, useState } from "react";

export type TelemetryFrame = {
  tripId: string;
  currentSpeed: number;
  gpsProgress: number;
  coordinates: { lat: number; lng: number };
};

export type TelemetryStatus = "connecting" | "live" | "offline";

type SocketState = "idle" | "live" | "closed";

/**
 * Opens the /api/dispatch/stream WebSocket (see server.js) and tracks the
 * latest frame it sends. The demo server only ever simulates one vehicle
 * (tripId "yutong-t12"), so callers should only pass `enabled: true` while
 * that specific trip is the one being viewed.
 */
export function useDispatchTelemetry(enabled: boolean) {
  const [socketState, setSocketState] = useState<SocketState>("idle");
  const [frame, setFrame] = useState<TelemetryFrame | null>(null);

  useEffect(() => {
    if (!enabled) return;

    const protocol = window.location.protocol === "https:" ? "wss" : "ws";
    const socket = new WebSocket(`${protocol}://${window.location.host}/api/dispatch/stream`);

    socket.addEventListener("open", () => setSocketState("live"));
    socket.addEventListener("close", () => setSocketState("closed"));
    socket.addEventListener("error", () => setSocketState("closed"));
    socket.addEventListener("message", (event) => {
      try {
        setFrame(JSON.parse(event.data) as TelemetryFrame);
      } catch {
        // Ignore malformed frames rather than crashing the socket handler.
      }
    });

    return () => {
      socket.close();
      setSocketState("idle");
      setFrame(null);
    };
  }, [enabled]);

  // Derived rather than set directly in the effect body — "connecting" is
  // just "enabled, but the socket hasn't told us it's open yet".
  const status: TelemetryStatus = !enabled
    ? "offline"
    : socketState === "live"
      ? "live"
      : socketState === "closed"
        ? "offline"
        : "connecting";

  return { status, frame: enabled ? frame : null };
}
