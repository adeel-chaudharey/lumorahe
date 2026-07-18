"use client";

import { useRouter } from "next/navigation";
import { createClient } from "@/utils/supabase/client";

type Props = {
  id: string;
};

export default function DeleteCategoryButton({
  id,
}: Props) {
  const router = useRouter();
  const supabase = createClient();

  async function handleDelete() {
    const confirmed = window.confirm(
      "Delete this category?"
    );

    if (!confirmed) return;

    const { error } = await supabase
      .from("categories")
      .delete()
      .eq("id", id);

    if (error) {
      console.error(error);
      alert(error.message);
      return;
    }

    router.refresh();
  }

  return (
    <button
      onClick={handleDelete}
      className="rounded-lg bg-red-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-red-500"
    >
      Delete
    </button>
  );
}