export enum CampaignStatus {
  PENDING = "pending",
  ACTIVE = "active",
  COMPLETED = "completed",
}

export interface Campaign {
  id: string;
  title: string;
  description: string | null;
  status: CampaignStatus;
  budget: number;
  created_at: string;
  updated_at: string;
}

export interface CampaignCreate {
  title: string;
  description?: string;
  status: CampaignStatus;
  budget: number;
}

export interface CampaignUpdate {
  title?: string;
  description?: string;
  status?: CampaignStatus;
  budget?: number;
}

export interface DashboardStats {
  total_campaigns: number;
  status_counts: {
    pending: number;
    active: number;
    completed: number;
  };
  budget_stats: {
    total: number;
    average: number;
    min: number;
    max: number;
  };
}

export interface Quote {
  quote: string;
  author: string;
}

export interface TrendingPost {
  id: number;
  title: string;
  body: string;
  tags: string[];
  reactions: {
    likes: number;
    dislikes: number;
  };
}
