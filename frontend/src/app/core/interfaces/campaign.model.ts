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
  campaignFiles: any[];
  createdBy: number;
  salesBrief: any;
}

export interface createCampaignModel{
  campaignName: string;
  market: string;
  clientId: number;
  brandId: number;
  createdBy: number;
  briefId: number;
}

export interface uploadCampaignFileModel{
  campaignId: number;
  fileName: string;
  filePath: string;
  fileType: string;
  fileSize: number;
  uploadedBy: number;
}

