"use client";
import { useState } from "react";
import Link from "next/link";
import CampaignList from "@/components/CampaignList";
import { useCampaigns } from "@/hooks/useCampaigns";
import { MdErrorOutline } from "react-icons/md";

export default function CampaignsPage() {
  const { campaigns, loading, error, refetch } = useCampaigns();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="main-loader mx-auto mb-4" />
          <p className="text-gray font-medium">Loading campaigns...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <MdErrorOutline color="#c40414" size={50} className="mx-auto mb-3" />

          <p className="text-gray font-medium mb-2">
            {error || "Failed to load campaigns"}
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
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-primary">Campaigns</h1>
        <Link
          href="/campaigns/create"
          className="bg-primary hover:bg-trinary text-white px-6 py-2 rounded-lg transition"
        >
          Create Campaign
        </Link>
      </div>

      <CampaignList campaigns={campaigns} onUpdate={refetch} />
    </div>
  );
}
