"use client";
import { useState } from "react";
import Link from "next/link";
import { Campaign } from "@/types/campaign";
import { deleteCampaign } from "@/services/api";

interface CampaignListProps {
  campaigns: Campaign[];
  onUpdate: () => void;
}

export default function CampaignList({
  campaigns,
  onUpdate,
}: CampaignListProps) {
  const [deleting, setDeleting] = useState<string | null>(null);

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this campaign?")) {
      return;
    }

    try {
      setDeleting(id);
      await deleteCampaign(id);
      onUpdate();
    } catch (error) {
      console.error("Failed to delete campaign:", error);
      alert("Failed to delete campaign");
    } finally {
      setDeleting(null);
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "pending":
        return "text-trinary";
      case "active":
        return " text-red";
      case "completed":
        return "text-green";
      default:
        return "text-gray";
    }
  };

  if (campaigns.length === 0) {
    return (
      <div className="text-center py-12 bg-white rounded-lg shadow">
        <p className="text-gray text-lg">
          No campaigns found. Create your first campaign!
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {campaigns.map((campaign) => (
        <div
          key={campaign.id}
          className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg border border-trinary"
        >
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-semibold text-black">
              {campaign.title}
            </h3>
            <span
              className={`px-3 py-1 rounded-full text-xs font-semibold uppercase ${getStatusColor(campaign.status)}`}
            >
              {campaign.status}
            </span>
          </div>

          <p className="text-gray mb-4 line-clamp-3">
            {campaign.description || "No description"}
          </p>

          <div className="mb-4">
            <p className="text-2xl font-bold text-green">
              ₹{campaign.budget.toLocaleString()}
            </p>
            <p className="text-sm text-gray">
              Created: {new Date(campaign.created_at).toLocaleDateString()}
            </p>
          </div>

          <div className="flex space-x-2">
            <Link
              href={`/campaigns/${campaign.id}/edit`}
              className="flex-1 bg-primary hover:bg-trinary text-white text-center px-4 py-2 rounded transition"
            >
              Edit
            </Link>
            <button
              onClick={() => handleDelete(campaign.id)}
              disabled={deleting === campaign.id}
              className="flex-1 bg-gray hover:bg-body text-white px-4 py-2 rounded transition disabled:opacity-50"
            >
              {deleting === campaign.id ? "Deleting..." : "Delete"}
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}
