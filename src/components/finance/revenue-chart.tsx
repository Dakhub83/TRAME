import type { MonthlyRevenuePoint } from "@/lib/finance";

const VIEW_W = 480;
const VIEW_H = 220;
const PADDING_X = 24;
const PADDING_BOTTOM = 28;
const PADDING_TOP = 12;

export function RevenueChart({ data }: { data: MonthlyRevenuePoint[] }) {
  const max = Math.max(...data.map((d) => d.revenueFcfa));
  const chartHeight = VIEW_H - PADDING_TOP - PADDING_BOTTOM;
  const slotWidth = (VIEW_W - PADDING_X * 2) / data.length;
  const barWidth = slotWidth * 0.55;

  return (
    <svg viewBox={`0 0 ${VIEW_W} ${VIEW_H}`} className="h-auto w-full" aria-hidden="true">
      <line
        x1={PADDING_X}
        y1={VIEW_H - PADDING_BOTTOM}
        x2={VIEW_W - PADDING_X}
        y2={VIEW_H - PADDING_BOTTOM}
        strokeWidth={1}
        className="stroke-graphite-line"
      />

      {data.map((point, index) => {
        const barHeight = (point.revenueFcfa / max) * chartHeight;
        const x = PADDING_X + index * slotWidth + (slotWidth - barWidth) / 2;
        const y = VIEW_H - PADDING_BOTTOM - barHeight;

        return (
          <g key={point.month}>
            <rect
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              rx={3}
              className={index % 2 === 0 ? "fill-teal" : "fill-teal-dim"}
            />
            <text
              x={x + barWidth / 2}
              y={VIEW_H - PADDING_BOTTOM + 16}
              textAnchor="middle"
              fontSize="9"
              letterSpacing="0.5"
              className="font-data fill-titanium-dim uppercase"
            >
              {point.month}
            </text>
          </g>
        );
      })}
    </svg>
  );
}
