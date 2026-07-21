import { notFound } from "next/navigation";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import CustomerOrders from "@/components/customers/CustomerOrders";
import CustomerAddresses from "@/components/customers/CustomerAddresses";

export default async function CustomerDetailsPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: customer } = await supabase
  .from("customers")
  .select(`
    *,
    addresses (*),
    orders (
      id,
      total,
      status,
      payment_status,
      fulfillment_status,
      created_at,
      tracking_number
    )
  `)
  .eq("id", id)
  .single();

  if (!customer) {
    notFound();
  }

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-white">
        {customer.full_name}
      </h1>

      <div className="grid grid-cols-3 gap-6">
        {/* Customer Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Customer
          </h2>

          <p className="text-white">{customer.full_name}</p>

          <p className="text-slate-400">
            {customer.email}
          </p>

          <p className="text-slate-400">
            {customer.phone || "—"}
          </p>
        </div>

        {/* Orders Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Orders
          </h2>

          <p>Total Orders: {customer.total_orders}</p>

          <p>
            Total Spent: $
            {Number(customer.total_spent).toFixed(2)}
          </p>

          <p>
            Loyalty Points: {customer.loyalty_points}
          </p>
        </div>

        {/* Account Card */}
        <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
          <h2 className="mb-4 text-lg font-semibold text-white">
            Account
          </h2>

          <p>
            Verified:{" "}
            {customer.email_verified ? "Yes" : "No"}
          </p>

          <p>
            Joined:{" "}
            {new Date(
              customer.created_at
            ).toLocaleDateString()}
          </p>

          <p>
            Last Login:{" "}
            {customer.last_login
              ? new Date(
                  customer.last_login
                ).toLocaleDateString()
              : "Never"}
          </p>
        </div>
      </div>

      {/* Addresses */}
      <CustomerAddresses
        addresses={customer.addresses ?? []}
      />

      <CustomerOrders
  orders={customer.orders ?? []}
/> 
    </div>
  );
}