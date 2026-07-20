"use client";

import { Search } from "lucide-react";

export default function CustomerSearch() {
  return (
    <div className="relative">
      <Search
        size={18}
        className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400"
      />

      <input
        type="text"
        placeholder="Search customers..."
        className="w-full rounded-xl border border-slate-700 bg-slate-900 py-3 pl-11 pr-4 text-white placeholder:text-slate-500 outline-none focus:border-emerald-500 transition"
      />
    </div>
  );
}

//relative path :app\admin\customers