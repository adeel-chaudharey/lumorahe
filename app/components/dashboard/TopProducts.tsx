import Image from "next/image";

type Product = {
  id: string;
  name: string;
  price: number;
  stock: number;
  image_url: string | null;
};

type TopProductsProps = {
  products: Product[];
};

export default function TopProducts({
  products,
}: TopProductsProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Latest Products
      </h2>

      <div className="space-y-4">
        {products.length === 0 ? (
          <p className="text-slate-400">
            No products found.
          </p>
        ) : (
          products.map((product) => (
            <div
              key={product.id}
              className="flex items-center justify-between"
            >
              <div className="flex items-center gap-4">
                {product.image_url ? (
                  <Image
                    src={product.image_url}
                    alt={product.name}
                    width={50}
                    height={50}
                    className="rounded-lg object-cover"
                  />
                ) : (
                  <div className="flex h-[50px] w-[50px] items-center justify-center rounded-lg bg-slate-800">
                    📦
                  </div>
                )}

                <div>
                  <p className="font-medium text-white">
                    {product.name}
                  </p>

                  <p className="text-sm text-slate-400">
                    Stock: {product.stock}
                  </p>
                </div>
              </div>

              <span className="font-semibold text-emerald-400">
                ${product.price}
              </span>
            </div>
          ))
        )}
      </div>
    </div>
  );
}