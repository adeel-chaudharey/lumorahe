"use client";

import Link from "next/link";
import {
  Package,
  FolderTree,
  ShoppingCart,
  Users,
  Plus,
} from "lucide-react";

const actions = [
  {
    title: "Add Product",
    href: "/admin/products/new",
    icon: Plus,
    color: "bg-emerald-500/20 text-emerald-400",
  },
  {
    title: "Products",
    href: "/admin/products",
    icon: Package,
    color: "bg-blue-500/20 text-blue-400",
  },
  {
    title: "Categories",
    href: "/admin/categories",
    icon: FolderTree,
    color: "bg-purple-500/20 text-purple-400",
  },
  {
    title: "Orders",
    href: "/admin/orders",
    icon: ShoppingCart,
    color: "bg-orange-500/20 text-orange-400",
  },
  {
    title: "Customers",
    href: "/admin/customers",
    icon: Users,
    color: "bg-pink-500/20 text-pink-400",
  },
];

export default function QuickActions() {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-bold text-white">
        Quick Actions
      </h2>

      <div className="grid grid-cols-2 gap-4 lg:grid-cols-5">
        {actions.map((action) => {
          const Icon = action.icon;

          return (
            <Link
              key={action.title}
              href={action.href}
              className="group rounded-xl border border-slate-800 bg-slate-950 p-5 transition-all duration-300 hover:-translate-y-1 hover:border-emerald-500 hover:shadow-lg hover:shadow-emerald-500/10"
            >
              <div
                className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl ${action.color}`}
              >
                <Icon size={24} />
              </div>

              <h3 className="font-semibold text-white group-hover:text-emerald-400">
                {action.title}
              </h3>
            </Link>
          );
        })}
      </div>
    </div>
  );
}