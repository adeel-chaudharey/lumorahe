export default function Header() {
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <header className="flex items-center justify-between mb-10">
      <div>
        <h1 className="text-4xl font-bold text-white">
          Dashboard
        </h1>

        <p className="text-slate-400 mt-2">
          Welcome back! Here's what's happening in your store today.
        </p>
      </div>

      <div className="flex items-center gap-4">

        <input
          type="text"
          placeholder="Search..."
          className="
            bg-slate-800
            border
            border-slate-700
            rounded-xl
            px-5
            py-3
            text-white
            outline-none
            w-72
            transition-all
            duration-300
            focus:border-emerald-400
            focus:shadow-[0_0_15px_rgba(52,211,153,0.2)]
          "
        />

        <button
          className="
            bg-emerald-500
            hover:bg-emerald-400
            text-slate-950
            font-semibold
            rounded-xl
            px-6
            py-3
            transition-all
            duration-300
            hover:scale-105
            hover:shadow-[0_0_20px_rgba(52,211,153,0.35)]
          "
        >
          + Add Product
        </button>

        <div className="text-right">
          <p className="text-white font-semibold">
            Admin
          </p>

          <p className="text-slate-400 text-sm">
            {today}
          </p>
        </div>

      </div>
    </header>
  );
}