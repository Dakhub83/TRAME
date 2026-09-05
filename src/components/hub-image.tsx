"use client";

import Image from "next/image";

export function HubImage() {
  return (
    <div className="relative mt-10 aspect-16/10 w-full overflow-hidden rounded-2xl border border-graphite-line bg-obsidian">
      <Image
        src="/images/about/hub-gare.jpg"
        alt="Le hub TRAME — quais de départ vers Ouagadougou et Bobo-Dioulasso"
        fill
        priority
        unoptimized
        className="object-cover"
      />
    </div>
  );
}
