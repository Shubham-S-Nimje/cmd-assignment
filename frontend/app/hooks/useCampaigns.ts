import { useState, useEffect } from "react";
import { Campaign } from "@/types/campaign";
import { getAllCampaigns } from "@/services/api";

export function useCampaigns() {
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchCampaigns = async () => {
    try {
      setLoading(true);
      const data = await getAllCampaigns();
      setCampaigns(data);
      setError(null);
    } catch (err) {
      setError("Failed to fetch campaigns");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCampaigns();
  }, []);

  return { campaigns, loading, error, refetch: fetchCampaigns };
}
