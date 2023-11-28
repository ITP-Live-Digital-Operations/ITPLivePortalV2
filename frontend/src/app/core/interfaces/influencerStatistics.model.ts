export interface InfluencerStatisticsModel{
  id: number;
  platform: string;
  deliverable: string;
  followers: number;
  reach: number;
  impressions: number;
  interactions: number;
  clientCost: number;
  influencerCost: number;
  metric: string;
  POC: string;
  year: number;
  camnpaignId: number;
  influencerId: number;
  createdAt: string;
  updatedAt: string;
}
