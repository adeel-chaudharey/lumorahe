import { Order } from "@/app/admin/orders/types";
import StatsCard from "@/app/components/dashboard/StatsCard";
import {
  ShoppingCart,
  DollarSign,
  CreditCard,
  Truck,
} from "lucide-react";

interface Props {
  orders: Order[];
}

export default function OrderStats({
  orders,
}: Props) {
  const revenue = orders.reduce(
    (sum, order) => sum + Number(order.total),
    0
  );

  const paid = orders.filter(
    (o) => o.payment_status === "Paid"
  ).length;

  const shipped = orders.filter(
    (o) => o.fulfillment_status === "Shipped"
  ).length;

  return (
    <div className="grid grid-cols-4 gap-6">
      <StatsCard
        title="Orders"
        value={String(orders.length)}
        description="Total Orders"
        change=""
        trend="up"
        icon={<ShoppingCart size={28} />}
      />

      <StatsCard
        title="Revenue"
        value={`$${revenue.toFixed(2)}`}
        description="Order Revenue"
        change=""
        trend="up"
        icon={<DollarSign size={28} />}
      />

      <StatsCard
        title="Paid"
        value={String(paid)}
        description="Successful Payments"
        change=""
        trend="up"
        icon={<CreditCard size={28} />}
      />

      <StatsCard
        title="Shipped"
        value={String(shipped)}
        description="Fulfilled Orders"
        change=""
        trend="up"
        icon={<Truck size={28} />}
      />
    </div>
  );
}