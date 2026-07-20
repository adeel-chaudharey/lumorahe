import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import { Customer } from "@/app/admin/customers/types";

export async function getCustomers(): Promise<Customer[]> {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data, error } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", { ascending: false });

  if (error) {
    throw error;
  }

  return data ?? [];
}