"use client";

import { useEffect, useRef } from "react";
import type { Map as LeafletMap, Marker, Polyline } from "leaflet";
import "leaflet/dist/leaflet.css";
import type { ScheduledStop } from "@/lib/dispatch";

type LatLng = { lat: number; lng: number };

/**
 * Only the fields this map actually draws — deliberately narrower than the
 * full ActiveTrip (which also carries currentSpeed, delayMinutes,
 * registrationCode, etc.), so public-facing callers like the ticket
 * tracker can pass a trimmed-down object instead of an admin-only type.
 */
export type LiveGpsMapTrip = {
  routeCode: string;
  gpsProgress: number;
  stops: ScheduledStop[];
};

/**
 * Real satellite tiles instead of a stylized route — Esri's World Imagery
 * service is free and needs no API key/token, unlike Mapbox/Google satellite
 * layers, which is why it's the base layer here rather than something more
 * polished.
 */
const TILE_URL = "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}";
const TILE_ATTRIBUTION = "Tiles &copy; Esri";

/** Treats stops as evenly spaced along the route rather than by real distance. */
function interpolatePosition(stops: LatLng[], progress: number): LatLng {
  const segmentCount = stops.length - 1;
  if (segmentCount <= 0) return stops[0];

  const scaled = (progress / 100) * segmentCount;
  const segmentIndex = Math.min(Math.floor(scaled), segmentCount - 1);
  const segmentT = scaled - segmentIndex;

  const from = stops[segmentIndex];
  const to = stops[segmentIndex + 1];
  return {
    lat: from.lat + (to.lat - from.lat) * segmentT,
    lng: from.lng + (to.lng - from.lng) * segmentT,
  };
}

function vehicleDivIcon(L: typeof import("leaflet")) {
  return L.divIcon({
    className: "",
    html: `
      <span style="position:relative;display:block;width:14px;height:14px;">
        <span style="position:absolute;inset:0;border-radius:9999px;background:#00e6c3;opacity:0.5;animation:trame-ping 1.6s cubic-bezier(0,0,0.2,1) infinite;"></span>
        <span style="position:absolute;inset:3px;border-radius:9999px;background:#00e6c3;box-shadow:0 0 12px rgba(0,230,195,0.7);"></span>
      </span>
      <style>@keyframes trame-ping { 75%, 100% { transform: scale(2.2); opacity: 0; } }</style>
    `,
    iconSize: [14, 14],
    iconAnchor: [7, 7],
  });
}

export function LiveGpsMap({
  trip,
  live = false,
  liveCoordinates = null,
}: {
  trip: LiveGpsMapTrip;
  live?: boolean;
  liveCoordinates?: LatLng | null;
}) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<LeafletMap | null>(null);
  const markerRef = useRef<Marker | null>(null);
  const routeRef = useRef<Polyline | null>(null);

  // Mount once per trip — recreated on route change rather than mutated,
  // since the stop list (and therefore the polyline/bounds) changes with it.
  useEffect(() => {
    if (!containerRef.current) return;
    let cancelled = false;

    import("leaflet").then((L) => {
      if (cancelled || !containerRef.current) return;

      const stops = trip.stops.map((s) => ({ lat: s.lat, lng: s.lng }));
      const start = interpolatePosition(stops, trip.gpsProgress);

      // No center/zoom here — the view is established once, below, via
      // fitBounds. Setting it twice (once here, then again to fit) makes
      // Leaflet request and immediately discard a whole first set of tiles.
      const map = L.map(containerRef.current, {
        attributionControl: false,
        zoomControl: true,
      });

      L.tileLayer(TILE_URL, { attribution: TILE_ATTRIBUTION, maxZoom: 17 }).addTo(map);
      L.control.attribution({ prefix: false }).addAttribution(TILE_ATTRIBUTION).addTo(map);

      const route = L.polyline(
        stops.map((s) => [s.lat, s.lng]),
        { color: "#00e6c3", weight: 3, opacity: 0.8 },
      ).addTo(map);
      routeRef.current = route;

      trip.stops.forEach((stop) => {
        const passed = stop.status === "PARTI" || stop.status === "ARRIVÉ";
        L.circleMarker([stop.lat, stop.lng], {
          radius: 5,
          color: passed ? "#00e6c3" : "#2b2f34",
          fillColor: passed ? "#00e6c3" : "#0a0b0d",
          fillOpacity: 1,
          weight: 2,
        })
          .bindTooltip(stop.stopName.split(" — ")[0], { direction: "top", offset: [0, -6] })
          .addTo(map);
      });

      const marker = L.marker([start.lat, start.lng], { icon: vehicleDivIcon(L) }).addTo(map);
      markerRef.current = marker;

      map.fitBounds(route.getBounds(), { padding: [28, 28] });
      mapRef.current = map;
    });

    return () => {
      cancelled = true;
      mapRef.current?.remove();
      mapRef.current = null;
      markerRef.current = null;
      routeRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- keyed on the route identity, not every stop object reference
  }, [trip.routeCode]);

  // Move the marker as progress (or a live GPS frame) updates, without
  // re-fitting the map — that would fight anyone panning/zooming manually.
  useEffect(() => {
    if (!markerRef.current) return;
    const stops = trip.stops.map((s) => ({ lat: s.lat, lng: s.lng }));
    const position = liveCoordinates ?? interpolatePosition(stops, trip.gpsProgress);
    markerRef.current.setLatLng([position.lat, position.lng]);
  }, [trip.gpsProgress, trip.stops, liveCoordinates]);

  const displayPosition =
    liveCoordinates ?? interpolatePosition(trip.stops.map((s) => ({ lat: s.lat, lng: s.lng })), trip.gpsProgress);

  return (
    <div className="relative mb-6 h-105 overflow-hidden rounded-xl border border-graphite-line bg-obsidian">
      <div className="pointer-events-none absolute inset-0 z-1000 flex items-start justify-between p-4">
        <div className="rounded-lg border border-graphite-line/80 bg-obsidian/80 px-3 py-1.5 backdrop-blur-sm">
          <p className="font-data text-[10px] uppercase tracking-wider text-titanium-dim">Suivi GPS live</p>
          <p className="font-data text-xs text-titanium">{trip.routeCode}</p>
        </div>

        <div
          className={`flex items-center gap-1.5 rounded-full border px-2.5 py-1 font-data text-[10px] uppercase tracking-wider backdrop-blur-sm ${
            live
              ? "border-teal-dim bg-obsidian/80 text-teal"
              : "border-graphite-line/80 bg-obsidian/80 text-titanium-dim"
          }`}
        >
          <span className={`h-1.5 w-1.5 rounded-full ${live ? "animate-pulse bg-teal" : "bg-titanium-dim"}`} />
          {live ? "En direct" : "Position simulée"}
        </div>
      </div>

      <div
        ref={containerRef}
        className="absolute inset-0 z-0 [&_.leaflet-control-attribution]:bg-obsidian/70 [&_.leaflet-control-attribution]:text-titanium-dim"
      />

      <div className="pointer-events-none absolute bottom-4 right-4 z-1000 rounded-lg border border-graphite-line/80 bg-obsidian/80 px-3 py-2 font-data text-[10px] text-titanium-dim backdrop-blur-sm">
        <div>
          LAT: <span className="text-titanium">{displayPosition.lat.toFixed(2)}°</span>
        </div>
        <div>
          LNG: <span className="text-titanium">{displayPosition.lng.toFixed(2)}°</span>
        </div>
      </div>
    </div>
  );
}
