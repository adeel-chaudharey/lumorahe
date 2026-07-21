import { getCoupons } from "./queries";

import CouponHeader from "@/components/coupons/CouponHeader";
import CouponStats from "@/components/coupons/CouponStats";
import CouponTable from "@/components/coupons/CouponTable";

export default async function CouponsPage() {
  const coupons = await getCoupons();

  return (
    <div className="space-y-8">
      <CouponHeader />

      <CouponStats
        coupons={coupons}
      />

      <CouponTable
        coupons={coupons}
      />
    </div>
  );
}