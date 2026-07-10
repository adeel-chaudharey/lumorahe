"use client";


import StatsCard from "@/admin/components/dashboard/StatsCard";
// Fallback local RevenueChart to avoid missing-module import error.
// If a real RevenueChart component exists elsewhere, replace this import accordingly.
function RevenueChart() {
  return (
    <div className="h-64 bg-white/5 rounded-lg flex items-center justify-center">
      <span className="text-sm text-muted-foreground">Revenue Chart Coming Soon</span>
    </div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-8">

      {/* KPI Cards */}

      <div className="grid grid-cols-4 gap-6">

        {/* 8 StatsCards */}

      </div>

      {/* Charts */}

      <div className="grid grid-cols-2 gap-6">

        <RevenueChart />

        <div>
          Sales Chart Coming Soon
        </div>

      </div>

    </div>
  );
}