type SalesChartProps = {
  data: {
    day: string;
    revenue: number;
  }[];
};

export default function SalesChart({
  data,
}: SalesChartProps) {
  return (
    <div className="rounded-2xl border border-slate-800 bg-slate-900 p-6">
      <h2 className="mb-6 text-xl font-semibold text-white">
        Weekly Sales
      </h2>

      <div className="space-y-4">
        {data.map((item) => (
          <div
            key={item.day}
            className="flex items-center gap-4"
          >
            <div className="w-12 text-slate-400">
              {item.day}
            </div>

            <div className="h-3 flex-1 rounded-full bg-slate-800">
              <div
                className="h-3 rounded-full bg-emerald-500"
                style={{
                  width: `${Math.min(
                    item.revenue / 100,
                    100
                  )}%`,
                }}
              />
            </div>

            <div className="w-20 text-right text-white">
              ${item.revenue.toFixed(0)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}