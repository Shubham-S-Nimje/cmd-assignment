"use client";
import { useState, useEffect } from "react";
import DashboardCharts from "@/components/DashboardCharts";
import QuoteDisplay from "@/components/QuoteDisplay";
import { useDashboard } from "@/hooks/useDashboard";
import { MdErrorOutline, MdRefresh } from "react-icons/md";
import TrendingPosts from "@/components/TrendingPosts";

export default function DashboardPage() {
  const { stats, loading, error, refetch } = useDashboard();

  // Auto-refresh stats every 30 seconds
  // useEffect(() => {
  //   const interval = setInterval(() => {
  //     refetch();
  //   }, 30000);

  //   return () => clearInterval(interval);
  // }, [refetch]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="main-loader mx-auto mb-4" />
          <p className="text-gray font-medium">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (error || !stats) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <MdErrorOutline color="#c40414" size={50} className="mx-auto mb-3" />

          <p className="text-gray font-medium mb-2">
            {error || "Failed to load dashboard"}
          </p>

          <p className="text-sm text-primary">
            This may happen due to a re-render or a cold start. If the page was
            refreshed or opened after some time, the server may take a few
            seconds to respond. Please wait a moment and try again.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-primary mb-6">Dashboard</h1>
        <button
          className="text-lg font-semibold text-black mb-2 flex justify-end items-center gap-2"
          onClick={() => refetch()}
        >
          <MdRefresh size={20} /> <span>Refresh</span>
        </button>
      </div>
      <QuoteDisplay />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="bg-white rounded-lg shadow-md p-6 border border-trinary">
          <h3 className="text-lg font-semibold text-gray mb-2">
            Total Campaigns
          </h3>
          <p className="text-4xl font-bold text-orange">
            {stats.total_campaigns}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-trinary">
          <h3 className="text-lg font-semibold text-gray mb-2">Total Budget</h3>
          <p className="text-4xl font-bold text-orange">
            ₹{stats.budget_stats.total.toLocaleString()}
          </p>
        </div>

        <div className="bg-white rounded-lg shadow-md p-6 border border-trinary">
          <h3 className="text-lg font-semibold text-gray mb-2">
            Average Budget
          </h3>
          <p className="text-4xl font-bold text-orange">
            ₹{stats.budget_stats.average.toLocaleString()}
          </p>
        </div>
      </div>

      <DashboardCharts stats={stats} />

      <TrendingPosts />
    </div>
  );
}
