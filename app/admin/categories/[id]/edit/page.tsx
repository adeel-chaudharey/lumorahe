import { notFound } from "next/navigation";
import { cookies } from "next/headers";

import CategoryForm from "@/components/categories/CategoryForm";
import { createClient } from "@/utils/supabase/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export default async function EditCategoryPage({
  params,
}: Props) {
  const { id } = await params;

  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: category } = await supabase
    .from("categories")
    .select("*")
    .eq("id", id)
    .single();

  if (!category) {
    notFound();
  }

  return (
    <div className="p-8">
      <CategoryForm
        categoryId={category.id}
        initialData={{
          name: category.name,
          slug: category.slug,
          description: category.description ?? "",
          featured: category.featured,
        }}
      />
    </div>
  );
}