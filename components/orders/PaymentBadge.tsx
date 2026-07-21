interface Props {
  status: string;
}

export default function PaymentBadge({
  status,
}: Props) {
  const colors: Record<string, string> = {
    Paid: "bg-emerald-500/20 text-emerald-400",
    Pending: "bg-yellow-500/20 text-yellow-400",
    Failed: "bg-red-500/20 text-red-400",
    Refunded: "bg-purple-500/20 text-purple-400",
  };

  return (
    <span
      className={`rounded-full px-3 py-1 text-xs font-semibold ${
        colors[status] ??
        "bg-slate-700 text-slate-300"
      }`}
    >
      {status}
    </span>
  );
}