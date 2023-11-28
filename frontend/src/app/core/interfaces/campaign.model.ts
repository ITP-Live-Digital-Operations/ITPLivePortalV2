import { ClientModel } from "./client.model";
import { InfluencerModel } from "./influencersModel";

export interface CampaignModel {
  id: number;
  campaignName: string;
  market: string;
  client: ClientModel;
  Influencers: InfluencerModel[];
  createdAt: Date;
  updatedAt: Date;
}
