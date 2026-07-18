import { cookies } from "next/headers";
import { createClient } from "@/utils/supabase/server";

import StatsCard from "../../components/dashboard/StatsCard";
import RevenueChart from "../../components/dashboard/RevenueChart";




// Placeholder components
function SalesChart() {
  return <div className="card">Sales Chart</div>;
}
const RecentOrders = () => <div className="card">Recent Orders</div>;
const LatestCustomers = () => <div className="card">Latest Customers</div>;
// TopProducts component file was causing a TS module error in some setups.
// Provide a simple local placeholder to avoid build-time module resolution issues.

const LowStockProducts = () => <div className="card">Low Stock Products</div>;
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
  const cookieStore = await cookies();
  const supabase = createClient(cookieStore);

  const [
  { count: productCount },
  { count: categoryCount },
  { data: latestProducts },
] = await Promise.all([
  supabase
    .from("products")
    .select("*", {
      count: "exact",
      head: true,
    }),

  supabase
    .from("categories")
    .select("*", {
      count: "exact",
      head: true,
    }),

  supabase
    .from("products")
    .select("id, name, price, stock, image_url")
    .order("created_at", { ascending: false })
    .limit(5),
]);

  return (
    <div className="space-y-8">
      {/* KPI Cards */}

      <div className="grid grid-cols-4 gap-6">
        <StatsCard
          title="Today's Revenue"
          value="$12,540"
          description="Compared to yesterday"
          change="+12.4%"
          trend="up"
          icon={<DollarSign size={28} />}
        />

        <StatsCard
          title="Monthly Revenue"
          value="$87,200"
          description="Compared to last month"
          change="+18.7%"
          trend="up"
          icon={<TrendingUp size={28} />}
        />

        <StatsCard
          title="Orders"
          value="248"
          description="Pending Orders"
          change="+6.1%"
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
          value="12"
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
          value="$92"
          description="Average Order Value"
          change="+5.2%"
          trend="up"
          icon={<CreditCard size={28} />}
        />
      </div>

      {/* Charts */}

      <div className="grid grid-cols-2 gap-6">
        <RevenueChart />
        <SalesChart />
      </div>

      {/* Tables */}

      <div className="grid grid-cols-2 gap-6">
        <RecentOrders />
        <TopProducts
  products={latestProducts ?? []}
/>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <LatestCustomers />
        <LowStockProducts />
      </div>

      <div className="grid grid-cols-2 gap-6">
        <RecentReviews />
        <ActivityFeed />
      </div>

      <QuickActions />
    </div>
  );
}