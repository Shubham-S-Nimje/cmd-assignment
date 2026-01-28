import axios from "axios";
import {
  Campaign,
  CampaignCreate,
  CampaignUpdate,
  DashboardStats,
  Quote,
} from "@/types/campaign";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// All Campaigns
export const getAllCampaigns = async (): Promise<Campaign[]> => {
  const response = await api.get("/api/campaigns");
  return response.data;
};

// Campaign By Id
export const getCampaignById = async (id: string): Promise<Campaign> => {
  const response = await api.get(`/api/campaigns/${id}`);
  return response.data;
};

// create Campaign
export const createCampaign = async (
  data: CampaignCreate,
): Promise<Campaign> => {
  const response = await api.post("/api/campaigns", data);
  return response.data;
};

// update Campaign
export const updateCampaign = async (
  id: string,
  data: CampaignUpdate,
): Promise<Campaign> => {
  const response = await api.put(`/api/campaigns/${id}`, data);
  return response.data;
};

// delete Campaign
export const deleteCampaign = async (id: string): Promise<void> => {
  await api.delete(`/api/campaigns/${id}`);
};

// Dashboard
export const getDashboardStats = async (): Promise<DashboardStats> => {
  const response = await api.get("/api/dashboard/stats");
  return response.data;
};

// Motivational Quotes
export const getMotivationalQuote = async (): Promise<Quote> => {
  const response = await api.get("/api/external/quote");
  return response.data;
};

// Trending Posts
export const getTrendingPosts = async () => {
  const response = await api.get("/api/external/trending-posts");
  return response.data;
};
