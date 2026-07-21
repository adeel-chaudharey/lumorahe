import { getCustomers } from "./queries";

import CustomerHeader from "@/components/customers/CustomerHeader";
import CustomerStats from "@/components/customers/CustomerStats";
import CustomerSearch from "@/components/customers/CustomerSearch";
import CustomerTable from "@/components/customers/CustomerTable";

export default async function CustomersPage() {
  const customers = await getCustomers();

  return (
    <div className="space-y-8">
      <CustomerHeader />

      <CustomerStats customers={customers} />

      <CustomerSearch />

      <CustomerTable customers={customers} />
    </div>
  );
}


//customers dynamic route page