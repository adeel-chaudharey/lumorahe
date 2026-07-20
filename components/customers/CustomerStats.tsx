import { Users, DollarSign, ShoppingCart, Star } from "lucide-react";
import { Customer } from "@/app/admin/customers/types";
import StatsCard from "@/app/components/dashboard/StatsCard";

interface Props {
  customers: Customer[];
}

export default function CustomerStats({
  customers,
}: Props) {
  const totalCustomers = customers.length;

  const totalRevenue = customers.reduce(
    (sum, customer) => sum + Number(customer.total_spent),
    0
  );

  const totalOrders = customers.reduce(
    (sum, customer) => sum + customer.total_orders,
    0
  );

  const averageCustomerValue =
    totalCustomers > 0
      ? totalRevenue / totalCustomers
      : 0;

  return (
    <div className="grid grid-cols-4 gap-6">
      <StatsCard
        title="Customers"
        value={String(totalCustomers)}
        description="Registered Customers"
        change=""
        trend="up"
        icon={<Users size={28} />}
      />

      <StatsCard
        title="Lifetime Revenue"
        value={`$${totalRevenue.toFixed(2)}`}
        description="Customer Spending"
        change=""
        trend="up"
        icon={<DollarSign size={28} />}
      />

      <StatsCard
        title="Orders"
        value={String(totalOrders)}
        description="Completed Orders"
        change=""
        trend="up"
        icon={<ShoppingCart size={28} />}
      />

      <StatsCard
        title="Average Value"
        value={`$${averageCustomerValue.toFixed(2)}`}
        description="Per Customer"
        change=""
        trend="up"
        icon={<Star size={28} />}
      />
    </div>
  );
}