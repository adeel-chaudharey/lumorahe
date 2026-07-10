type StatsCardProps = {
  title: string;
  value: string | number;
  description: string;
};

export default function StatsCard({
  title,
  value,
  description,
}: StatsCardProps) {
  return (
    <div
      className="
        bg-slate-900
        border
        border-slate-800
        rounded-2xl
        p-6
        transition-all
        duration-300
        hover:scale-[1.03]
        hover:border-emerald-400/50
        hover:shadow-[0_0_25px_rgba(52,211,153,0.18)]
        cursor-pointer
      "
    >
      <p className="text-slate-400 text-sm">
        {title}
      </p>

      <h2 className="text-4xl font-bold text-white mt-3">
        {value}
      </h2>

      <p className="text-slate-500 mt-4">
        {description}
      </p>
    </div>
  );
}