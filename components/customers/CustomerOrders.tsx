interface Order {
  id: string;
  total: number;
  status: string;
  payment_status: string;
  fulfillment_status: string;
  created_at: string;
  tracking_number: string | null;
}

interface Props {
  orders: Order[];
}

export default function CustomerOrders({
  orders,
}: Props) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Customer Orders
      </h2>

      {orders.length === 0 ? (
        <p className="text-slate-400">
          No orders yet.
        </p>
      ) : (
        <table className="w-full">
          <thead className="border-b border-slate-800">
            <tr>
              <th className="pb-4 text-left">Order</th>
              <th className="pb-4 text-left">Total</th>
              <th className="pb-4 text-left">Status</th>
              <th className="pb-4 text-left">Payment</th>
              <th className="pb-4 text-left">Fulfillment</th>
              <th className="pb-4 text-left">Date</th>
            </tr>
          </thead>

          <tbody>
            {orders.map((order) => (
              <tr
                key={order.id}
                className="border-b border-slate-800 hover:bg-slate-800/50"
              >
                <td className="py-4">
                  #{order.id.slice(0, 8)}
                </td>

                <td className="py-4">
                  ${Number(order.total).toFixed(2)}
                </td>

                <td className="py-4">
                  {order.status}
                </td>

                <td className="py-4">
                  {order.payment_status}
                </td>

                <td className="py-4">
                  {order.fulfillment_status}
                </td>

                <td className="py-4">
                  {new Date(
                    order.created_at
                  ).toLocaleDateString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}