import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

export async function getCoupons() {
  const cookieStore = await cookies();

  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from("coupons")
    .select("*")
    .order("created_at", {
      ascending: false,
    });

  return data ?? [];
}

export async function getCoupon(id: string) {
  const cookieStore = await cookies();

  const supabase = createClient(cookieStore);

  const { data } = await supabase
    .from("coupons")
    .select("*")
    .eq("id", id)
    .single();

  return data;
}