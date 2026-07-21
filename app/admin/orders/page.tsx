import { getOrders } from "./queries";

import OrderHeader from "@/components/orders/OrderHeader";
import OrderStats from "@/components/orders/OrderStats";
import OrderSearch from "@/components/orders/OrderSearch";
import OrderTable from "@/components/orders/OrderTable";

export default async function OrdersPage() {
  const orders = await getOrders();

  return (
    <div className="space-y-8">
      <OrderHeader />

      <OrderStats orders={orders} />

      <OrderSearch />

      <OrderTable orders={orders} />
    </div>
  );
}