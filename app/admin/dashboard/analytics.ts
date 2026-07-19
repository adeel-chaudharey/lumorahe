export function getDashboardAnalytics(
  orders: {
    total: number;
    created_at: string;
  }[],
  orderCount: number
) {
  const today = new Date();

  const todayRevenue =
    orders
      .filter((order) => {
        const d = new Date(order.created_at);

        return (
          d.getDate() === today.getDate() &&
          d.getMonth() === today.getMonth() &&
          d.getFullYear() === today.getFullYear()
        );
      })
      .reduce(
        (sum, order) => sum + Number(order.total),
        0
      );

  const currentMonth = today.getMonth();
  const currentYear = today.getFullYear();

  const monthlyRevenue =
    orders
      .filter((order) => {
        const d = new Date(order.created_at);

        return (
          d.getMonth() === currentMonth &&
          d.getFullYear() === currentYear
        );
      })
      .reduce(
        (sum, order) => sum + Number(order.total),
        0
      );

  const averageOrderValue =
    orderCount > 0
      ? monthlyRevenue / orderCount
      : 0;

  const revenueByDay = Array.from(
    { length: 7 },
    (_, i) => {
      const date = new Date();

      date.setDate(date.getDate() - (6 - i));

      const revenue =
        orders
          .filter((order) => {
            const d = new Date(order.created_at);

            return (
              d.getDate() === date.getDate() &&
              d.getMonth() === date.getMonth() &&
              d.getFullYear() === date.getFullYear()
            );
          })
          .reduce(
            (sum, order) =>
              sum + Number(order.total),
            0
          );

      return {
        day: date.toLocaleDateString(
          "en-US",
          {
            weekday: "short",
          }
        ),
        revenue,
      };
    }
  );

  return {
    todayRevenue,
    monthlyRevenue,
    averageOrderValue,
    revenueByDay,
  };
}