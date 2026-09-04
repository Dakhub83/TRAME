import { FreightTracker } from "@/components/freight-tracker";
import { waybill } from "@/lib/freight";

export default function TrackPage() {
  return <FreightTracker waybill={waybill} />;
}
