import Link from "next/link";
import { Order } from "@/app/admin/orders/types";
import OrderStatusBadge from "./OrderStatusBadge";
import PaymentBadge from "./PaymentBadge";

interface Props {
  orders: Order[];
}

export default function OrderTable({
  orders,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <table className="w-full">
        <thead className="bg-slate-800">
          <tr>
            <th className="px-6 py-4 text-left">Customer</th>
            <th className="px-6 py-4 text-left">Total</th>
            <th className="px-6 py-4 text-left">Payment</th>
            <th className="px-6 py-4 text-left">Status</th>
            <th className="px-6 py-4 text-left">Date</th>
          </tr>
        </thead>

        <tbody>
          {orders.map((order) => (
            <tr
              key={order.id}
              className="border-t border-slate-800 transition hover:bg-slate-800/60"
            >
              <td className="px-6 py-4">
                <Link
                  href={`/admin/orders/${order.id}`}
                  className="font-semibold text-white hover:text-emerald-400"
                >
                  {order.customer_name}
                </Link>

                <p className="text-sm text-slate-400">
                  {order.customer_email}
                </p>
              </td>

              <td className="px-6 py-4">
                ${Number(order.total).toFixed(2)}
              </td>

              <td className="px-6 py-4">
                <PaymentBadge
                  status={order.payment_status}
                />
              </td>

              <td className="px-6 py-4">
                <OrderStatusBadge
                  status={order.fulfillment_status}
                />
              </td>

              <td className="px-6 py-4">
                {new Date(
                  order.created_at
                ).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}