import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup,
  Polyline,
} from "react-leaflet";

import "leaflet/dist/leaflet.css";

function colorFor(level) {
  if (level >= 80) return "hsl(0 84% 55%)";
  if (level >= 50) return "hsl(42 100% 50%)";
  return "hsl(152 76% 45%)";
}

export function BinMap({
  bins,
  height = "420px",
  routeBinIds,
  center = [26.872, 80.946],
}) {
  useEffect(() => {
    // Leaflet render fix (optional)
  }, []);

  const routeCoords = routeBinIds
    ? routeBinIds
        .map((id) => bins.find((b) => b.id === id))
        .filter(Boolean)
        .map((b) => [b.lat, b.lng])
    : null;

  return (
    <div
      className="overflow-hidden rounded-2xl border border-gray-300"
      style={{ height }}
    >
      <MapContainer
        center={center}
        zoom={12}
        scrollWheelZoom={false}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          attribution="&copy; OpenStreetMap"
          url="https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png"
        />

        {/* Route line */}
        {routeCoords && routeCoords.length > 1 && (
          <Polyline
            positions={routeCoords}
            pathOptions={{
              color: "hsl(152 76% 45%)",
              weight: 5,
              opacity: 0.85,
              dashArray: "8 8",
            }}
          />
        )}

        {/* Markers */}
        {bins.map((b) => (
          <CircleMarker
            key={b.id}
            center={[b.lat, b.lng]}
            radius={b.fillLevel >= 80 ? 14 : 10}
            pathOptions={{
              color: colorFor(b.fillLevel),
              fillColor: colorFor(b.fillLevel),
              fillOpacity: 0.7,
              weight: 2,
            }}
          >
            <Popup>
              <div className="space-y-1 text-sm">
                <div className="font-semibold">
                  {b.code} · {b.address}
                </div>
                <div>
                  Fill level: <strong>{b.fillLevel}%</strong>
                </div>
                <div className="text-muted-foreground">
                  AI: full in ~{b.predictionHours}h
                </div>
                <div className="text-xs uppercase tracking-wide">
                  {b.type}
                </div>
              </div>
            </Popup>
          </CircleMarker>
        ))}
      </MapContainer>
    </div>
  );
}