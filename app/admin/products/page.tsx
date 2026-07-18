import Link from "next/link";
import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

import Image from "next/image";


import DeleteButton from "@/components/products/sections/DeleteButton";
// Inline simple delete form (original DeleteButton component not found)


export default async function ProductsPage() {
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const result = await supabase
  .from("products")
  .select(`
    *,
    categories (
      name
    )
  `)
  .order("created_at", { ascending: false });

  const products = result.data ?? [];

  return (
    <div className="p-8">
      <h1 className="mb-8 text-3xl font-bold text-white">
        Products
      </h1>

      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-900">
        <table className="min-w-full">
         <thead className="border-b border-slate-800 bg-slate-950">
  <tr>
    <th className="px-6 py-4 text-left text-slate-300">
      Image
    </th>

    <th className="px-6 py-4 text-left text-slate-300">
      Product
    </th>


<th className="px-6 py-4 text-left text-slate-300">
  Category
</th>



    <th className="px-6 py-4 text-left text-slate-300">
      Price
    </th>

    <th className="px-6 py-4 text-left text-slate-300">
      Stock
    </th>

    <th className="px-6 py-4 text-left text-slate-300">
      Status
    </th>

    <th className="px-6 py-4 text-center text-slate-300">
      Actions
    </th>
  </tr>
</thead>

          <tbody>
            {products.map((product) => (
              <tr
                key={product.id}
                className="border-b border-slate-800 hover:bg-slate-800/40"
              >


<td className="px-6 py-4">
  {product.image_url ? (
    <Image
      src={product.image_url}
      alt={product.name}
      width={60}
      height={60}
      className="rounded-lg object-cover"
    />
  ) : (
    <div className="flex h-[60px] w-[60px] items-center justify-center rounded-lg bg-slate-800 text-slate-500">
      📦
    </div>
  )}
</td>


                <td className="px-6 py-4 text-white">
                  {product.name}
                </td>
<td className="px-6 py-4 text-slate-300">
  {product.categories?.name ?? "-"}
</td>
                <td className="px-6 py-4 text-emerald-400">
                  ${product.price}
                </td>

                <td className="px-6 py-4 text-white">
                  {product.stock}
                </td>

                <td className="px-6 py-4">
                  <span className="rounded-full bg-yellow-500/20 px-3 py-1 text-sm text-yellow-400">
                    {product.status}
                  </span>
                </td>

                <td className="px-6 py-4">
                  <div className="flex justify-center gap-3">

                    <Link
                      href={`/admin/products/${product.id}/edit`}
                      className="rounded-lg bg-emerald-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-emerald-500"
                    >
                      Update
                    </Link>
<DeleteButton id={product.id} />

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