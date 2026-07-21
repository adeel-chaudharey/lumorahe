import { notFound } from "next/navigation";
import OrderStatusForm from "@/components/orders/OrderStatusForm";
import { getOrder } from "../queries";

import OrderCustomer from "@/components/orders/OrderCustomer";
import OrderItems from "@/components/orders/OrderItems";
import OrderPayment from "@/components/orders/OrderPayment";
import OrderShipping from "@/components/orders/OrderShipping";
import OrderSummary from "@/components/orders/OrderSummary";

export default async function OrderDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const order = await getOrder(id);

  if (!order) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">
        Order #{order.id.slice(0, 8)}
      </h1>

      <div className="grid grid-cols-2 gap-6">
        <OrderCustomer order={order} />

        <OrderPayment order={order} />

        <OrderShipping order={order} />

        <OrderSummary order={order} />
      </div>

      <OrderItems
        items={order.order_items ?? []}
      />
      <OrderStatusForm order={order} />
    </div>
  );
}