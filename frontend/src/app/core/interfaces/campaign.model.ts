export interface CampaignModel {
  id: number;
  campaignName: string;
  clientName: string;
  market: string;
  clientIndustry: string;
  influencerName: string;
  influencerVertical: string;
  platform: string;
  deliverable: string;
  followers: number;
  reach: number;
  impressions: number;
  interactions: number;
  clientCost: number; // Assuming decimal is treated as a number in TypeScript context
  influencerCost: number; // Same assumption as above
  metric: string;
  poc: string;
  year: number;
}
