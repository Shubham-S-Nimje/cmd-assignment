"use client";
import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { DashboardStats } from "@/types/campaign";

interface DashboardChartsProps {
  stats: DashboardStats;
}

const STATUS_COLORS = {
  pending: "#FBBC05",
  active: "#c40414",
  completed: "#008000",
};

export default function DashboardCharts({ stats }: DashboardChartsProps) {
  const statusData = [
    {
      name: "Pending",
      value: stats.status_counts.pending,
      color: STATUS_COLORS.pending,
    },
    {
      name: "Active",
      value: stats.status_counts.active,
      color: STATUS_COLORS.active,
    },
    {
      name: "Completed",
      value: stats.status_counts.completed,
      color: STATUS_COLORS.completed,
    },
  ];

  const budgetData = [
    { name: "Min", value: stats.budget_stats.min },
    { name: "Average", value: stats.budget_stats.average },
    { name: "Max", value: stats.budget_stats.max },
  ];

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
      {/* Pie Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-trinary">
        <h2 className="text-xl font-semibold text-gray mb-4">
          Campaign Status Distribution
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={statusData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, value }) => `${name}: ${value}`}
              outerRadius={100}
              fill="#8884d8"
              dataKey="value"
            >
              {statusData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart */}
      <div className="bg-white rounded-lg shadow-md p-6 border border-trinary">
        <h2 className="text-xl font-semibold text-gray mb-4">
          Budget Analysis
        </h2>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={budgetData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip
              labelStyle={{
                color: "#000",
                fontWeight: "600",
              }}
              formatter={(value) => `₹${value.toLocaleString()}`}
            />
            <Legend />
            <Bar dataKey="value" fill="#c40414" name="Budget (₹)" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
