"use server";

import { cookies } from "next/headers";
import { revalidatePath } from "next/cache";

import { createClient } from "@/utils/supabase/server";

export async function updateOrder(
  id: string,
  values: {
    payment_status: string;
    fulfillment_status: string;
    tracking_number: string;
    notes: string;
  }
) {
  const cookieStore = await cookies();

  const supabase = createClient(cookieStore);

  await supabase
    .from("orders")
    .update(values)
    .eq("id", id);

  revalidatePath("/admin/orders");
  revalidatePath(`/admin/orders/${id}`);
}