"use client";

import { useState } from "react";
import type { FleetVehicle } from "@/lib/fleet";
import { FleetCard } from "@/components/fleet-card";

export function FleetGrid({ fleet }: { fleet: FleetVehicle[] }) {
  const [selectedId, setSelectedId] = useState(fleet[0]?.id);

  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {fleet.map((bus) => (
        <FleetCard
          key={bus.id}
          vehicle={bus}
          isActive={selectedId === bus.id}
          onSelect={() => setSelectedId(bus.id)}
        />
      ))}
    </div>
  );
}
