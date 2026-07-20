export default function CustomerHeader() {
  return (
    <div className="flex items-center justify-between">
      <div>
        <h1 className="text-3xl font-bold text-white">
          Customers
        </h1>

        <p className="text-slate-400 mt-1">
          Manage your store customers
        </p>
      </div>

      <button className="rounded-xl bg-emerald-500 px-5 py-3 font-medium hover:bg-emerald-600 transition">
        Export Customers
      </button>
    </div>
  );
}