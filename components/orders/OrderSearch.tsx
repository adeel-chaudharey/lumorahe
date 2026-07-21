"use client";

import { Search } from "lucide-react";

export default function OrderSearch() {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500"
      />

      <input
        type="text"
        placeholder="Search orders..."
        className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-12 pr-4 text-white outline-none focus:border-emerald-500"
      />
    </div>
  );
}