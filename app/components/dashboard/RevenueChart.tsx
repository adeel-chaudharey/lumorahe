export default function RevenueChart() {
  return (
    <div
      className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-6
        h-[420px]
        transition-all
        duration-300
        hover:border-emerald-400/40
        hover:shadow-[0_0_25px_rgba(52,211,153,0.18)]
      "
    >
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-2xl font-bold text-white">
            Revenue Analytics
          </h2>

          <p className="text-slate-400 mt-1">
            Revenue overview of your store
          </p>
        </div>

        <select
          className="
            bg-slate-800
            border
            border-slate-700
            rounded-lg
            px-4
            py-2
            text-white
            outline-none
            hover:border-emerald-400
          "
        >
          <option>Last 7 Days</option>
          <option>Last 30 Days</option>
          <option>Last 12 Months</option>
        </select>
      </div>

      <div
        className="
          flex
          items-center
          justify-center
          h-[280px]
          rounded-xl
          border-2
          border-dashed
          border-slate-700
          text-slate-500
          text-lg
        "
      >
        Revenue Chart Coming Soon
      </div>
    </div>
  );
}