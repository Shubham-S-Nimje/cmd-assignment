"use client";
import { useState, useEffect } from "react";
import { useRouter, useParams } from "next/navigation";
import CampaignForm from "@/components/CampaignForm";
import { getCampaignById, updateCampaign } from "@/services/api";
import { Campaign, CampaignUpdate } from "@/types/campaign";
import { MdErrorOutline } from "react-icons/md";

export default function EditCampaignPage() {
  const router = useRouter();
  const params = useParams();
  const campaignId = params.id as string;

  const [campaign, setCampaign] = useState<Campaign | null>(null);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // fetch campaingn by id
    const fetchCampaign = async () => {
      try {
        const data = await getCampaignById(campaignId);
        setCampaign(data);
      } catch (err) {
        setError("Failed to load campaign");
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCampaign();
  }, [campaignId]);

  // update campaign
  const handleSubmit = async (data: CampaignUpdate) => {
    try {
      setSubmitting(true);
      setError(null);
      await updateCampaign(campaignId, data);
      router.push("/campaigns");
    } catch (err) {
      setError("Failed to update campaign");
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="text-center">Loading campaign...</div>
      </div>
    );
  }

  if (error || !campaign) {
    return (
      <div className="min-h-screen flex items-center justify-center px-4">
        <div className="text-center max-w-md">
          <MdErrorOutline color="#c40414" size={50} className="mx-auto mb-3" />

          <p className="text-gray font-medium mb-2">
            {error || "Campaign not found"}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl">
      <h1 className="text-3xl font-bold text-primary mb-6">Edit Campaign</h1>

      {/* {error && (
        <div className="min-h-screen flex items-center justify-center px-4">
          <div className="text-center max-w-md">
            <MdErrorOutline
              color="#c40414"
              size={50}
              className="mx-auto mb-3"
            />

            <p className="text-gray font-medium mb-2">{error}</p>
          </div>
        </div>
      )} */}

      <div className="bg-white rounded-lg shadow-md p-6">
        <CampaignForm
          onSubmit={handleSubmit}
          loading={submitting}
          initialData={campaign}
          isEdit
        />
      </div>
    </div>
  );
}
