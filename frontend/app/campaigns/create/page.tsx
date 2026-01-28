"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CampaignForm from "@/components/CampaignForm";
import { createCampaign } from "@/services/api";
import { CampaignCreate, CampaignStatus } from "@/types/campaign";
import { MdErrorOutline } from "react-icons/md";

export default function CreateCampaignPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // create new campaign
  const handleSubmit = async (data: CampaignCreate) => {
    try {
      setLoading(true);
      setError(null);
      await createCampaign(data);
      router.push("/campaigns");
    } catch (err) {
      setError("Failed to create campaign");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-primary mb-6">Create Campaign</h1>

      {error && (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <MdErrorOutline
              color="#c40414"
              size={50}
              className="mx-auto mb-3"
            />

            <p className="text-gray font-medium mb-2">
              {error || "Campaign not found"}
            </p>
          </div>
        </div>
      )}

      <div className="bg-white rounded-lg shadow-md p-6 border border-trinary">
        <CampaignForm
          onSubmit={handleSubmit}
          loading={loading}
          initialData={{
            title: "",
            description: "",
            status: CampaignStatus.PENDING,
            budget: 0,
          }}
        />
      </div>
    </div>
  );
}
