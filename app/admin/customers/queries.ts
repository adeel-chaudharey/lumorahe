import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function getCustomers() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from("customers")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  return data ?? [];
}

export async function getCustomer(id: string) {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from("customers")
    .select(`
      *,
      addresses (*),
      orders (*)
    `)
    .eq("id", id)
    .single();

  return data;
}