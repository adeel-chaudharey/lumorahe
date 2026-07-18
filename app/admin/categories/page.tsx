import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";
import DeleteCategoryButton from "@/components/categories/DeleteCategoryButton";
export default async function CategoriesPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const { data: categories } = await supabase
    .from("categories")
    .select("*")
    .order("name");

  return (
    <div className="p-8">
      <div className="mb-8 flex items-center justify-between">
        <h1 className="text-3xl font-bold text-white">
          Categories
        </h1>

        <Link
          href="/admin/categories/new"
          className="rounded-xl bg-emerald-500 px-5 py-3 font-semibold text-slate-950 transition hover:scale-105"
        >
          + Add Category
        </Link>
      </div>

      <div className="overflow-hidden rounded-2xl border border-slate-800 bg-slate-900">
        <table className="min-w-full">
          <thead className="bg-slate-950">
            <tr>
              <th className="px-6 py-4 text-left text-slate-300">
                Name
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Slug
              </th>

              <th className="px-6 py-4 text-left text-slate-300">
                Featured
              </th>

              <th className="px-6 py-4 text-center text-slate-300">
                Actions
              </th>
            </tr>
          </thead>

          <tbody>
            {categories?.map((category) => (
              <tr
                key={category.id}
                className="border-t border-slate-800"
              >
                <td className="px-6 py-4 text-white">
                  {category.name}
                </td>

                <td className="px-6 py-4 text-slate-400">
                  {category.slug}
                </td>

                <td className="px-6 py-4">
                  {category.featured ? "⭐" : "-"}
                </td>

                <td className="px-6 py-4 text-center">
                 <div className="flex justify-center gap-3">
  <Link
    href={`/admin/categories/${category.id}/edit`}
    className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
  >
    Edit
  </Link>

 <DeleteCategoryButton
  id={category.id}
/>
</div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}