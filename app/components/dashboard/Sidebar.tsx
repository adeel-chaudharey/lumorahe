import Link from "next/link";

const menuItems = [
  { name: "Dashboard", href: "/admin/dashboard" },
  { name: "Products", href: "/admin/products" },
  { name: "Orders", href: "/admin/orders" },
  { name: "Customers", href: "/admin/customers" },
  { name: "Categories", href: "/admin/categories" },
  { name: "Coupons", href: "/admin/coupons" },
  { name: "Reviews", href: "/admin/reviews" },
  { name: "Inventory", href: "/admin/inventory" },
  { name: "Analytics", href: "/admin/analytics" },
  { name: "Settings", href: "/admin/settings" },
];

export default function Sidebar() {
  return (
    <aside className="w-72 min-h-screen bg-slate-900 border-r border-slate-800 p-6">
      <h1 className="text-3xl font-bold text-white mb-10">
        Lumora<span className="text-emerald-400">.</span>
      </h1>

      <nav className="space-y-3">
        {menuItems.map((item) => (
          <Link
            key={item.name}
            href={item.href}
            className="
              block
              rounded-xl
              px-5
              py-3
              text-slate-300
              transition-all
              duration-300
              hover:bg-slate-800
              hover:text-white
              hover:scale-[1.03]
              hover:border-l-4
              hover:border-emerald-400
            "
          >
            {item.name}
          </Link>
        ))}
      </nav>
    </aside>
  );
}