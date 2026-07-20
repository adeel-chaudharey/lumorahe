import { Customer } from "@/app/admin/customers/types";
import { CheckCircle, XCircle } from "lucide-react";

interface Props {
  customers: Customer[];
}

export default function CustomerTable({
  customers,
}: Props) {
  return (
    <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
      <table className="w-full">
        <thead className="bg-slate-800">
          <tr>
            <th className="px-6 py-4 text-left">Customer</th>
            <th className="px-6 py-4 text-left">Orders</th>
            <th className="px-6 py-4 text-left">Spent</th>
            <th className="px-6 py-4 text-left">Points</th>
            <th className="px-6 py-4 text-left">Verified</th>
            <th className="px-6 py-4 text-left">Joined</th>
          </tr>
        </thead>

        <tbody>
          {customers.map((customer) => (
            <tr
              key={customer.id}
              className="border-t border-slate-800 hover:bg-slate-800/60 transition"
            >
              <td className="px-6 py-4">
                <div>
                  <p className="font-semibold text-white">
                    {customer.full_name}
                  </p>

                  <p className="text-sm text-slate-400">
                    {customer.email}
                  </p>
                </div>
              </td>

              <td className="px-6 py-4">
                {customer.total_orders}
              </td>

              <td className="px-6 py-4">
                ${Number(customer.total_spent).toFixed(2)}
              </td>

              <td className="px-6 py-4">
                {customer.loyalty_points}
              </td>

              <td className="px-6 py-4">
                {customer.email_verified ? (
                  <CheckCircle
                    size={18}
                    className="text-emerald-500"
                  />
                ) : (
                  <XCircle
                    size={18}
                    className="text-red-500"
                  />
                )}
              </td>

              <td className="px-6 py-4">
                {new Date(
                  customer.created_at
                ).toLocaleDateString()}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}