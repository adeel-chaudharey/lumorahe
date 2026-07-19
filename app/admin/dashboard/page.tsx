import { getDashboardData } from "./queries";
import StatsCard from "../../components/dashboard/StatsCard";
import RevenueChart from "../../components/dashboard/RevenueChart";
import LowStockProducts from "../../components/dashboard/LowStockProducts";
import TopProducts from "../../components/dashboard/TopProducts";
import RecentOrders from "../../components/dashboard/RecentOrders";
import { getDashboardAnalytics } from "./analytics";
import SalesChart from "../../components/dashboard/SalesChart";

const LatestCustomers = () => <div className="card">Latest Customers</div>;

const RecentReviews = () => <div className="card">Recent Reviews</div>;
const ActivityFeed = () => <div className="card">Activity Feed</div>;
const QuickActions = () => <div className="card">Quick Actions</div>;

import {
  DollarSign,
  ShoppingCart,
  Package,
  Users,
  AlertTriangle,
  TrendingUp,
  CreditCard,
  Activity,
} from "lucide-react";

export default async function DashboardPage() {
  const {
    productCount,
    categoryCount,
    orderCount,
    orders,
    latestProducts,
    lowStockProducts,
    recentOrders,
  } = await getDashboardData();

const {
  todayRevenue,
  monthlyRevenue,
  averageOrderValue,
  revenueByDay,
} = getDashboardAnalytics(
  orders,
  orderCount
);


  return (
    <div className="space-y-8">
      {/* KPI Cards */}

      <div className="grid grid-cols-4 gap-6">
        <StatsCard
          title="Today's Revenue"
          value={`$${todayRevenue.toFixed(2)}`}
          description="Compared to yesterday"
          change="+12.4%"
          trend="up"
          icon={<DollarSign size={28} />}
        />

        <StatsCard
          title="Monthly Revenue"
          value={`$${monthlyRevenue.toFixed(2)}`}
          description="Compared to last month"
          change="+18.7%"
          trend="up"
          icon={<TrendingUp size={28} />}
        />

        <StatsCard
  title="Orders"
  value={String(orderCount ?? 0)}
  description="Total Orders"
  change=""
  trend="up"
  icon={<ShoppingCart size={28} />}
/>

        <StatsCard
          title="Products"
          value={String(productCount ?? 0)}
          description="Products Listed"
          change=""
          trend="up"
          icon={<Package size={28} />}
        />

        <StatsCard
          title="Categories"
          value={String(categoryCount ?? 0)}
          description="Store Categories"
          change=""
          trend="up"
          icon={<Users size={28} />}
        />

        <StatsCard
          title="Low Stock"
          value={String(lowStockProducts?.length ?? 0)}
          description="Need Restocking"
          change="-2"
          trend="down"
          icon={<AlertTriangle size={28} />}
        />

        <StatsCard
          title="Conversion Rate"
          value="4.8%"
          description="Store Conversion"
          change="+0.8%"
          trend="up"
          icon={<Activity size={28} />}
        />

        <StatsCard
          title="Average Order"
          value={`$${averageOrderValue.toFixed(2)}`}
          description="Average Order Value"
          change="+5.2%"
          trend="up"
          icon={<CreditCard size={28} />}
        />
      </div>

      {/* Charts */}

      <div className="grid grid-cols-2 gap-6">
        <RevenueChart
  data={revenueByDay}
/>
        <SalesChart data={revenueByDay} />
      </div>

      {/* Tables */}

      <div className="grid grid-cols-2 gap-6">
        <RecentOrders
  orders={recentOrders ?? []}
/>

        <TopProducts
  products={latestProducts ?? []}
/>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <LatestCustomers />
        <LowStockProducts
  products={lowStockProducts ?? []}
/>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <RecentReviews />
        <ActivityFeed />
      </div>

      <QuickActions />
    </div>
  );
}