import { InfluencerStatisticsModel } from "./influencerStatistics.model";

export interface InfluencerModel
 {
  id: number;
  Name: string;
  Gender: string;
  Number: string;
  Email: string;
  MainContentLanguage: string;
  SubContentLang: string;
  MainVertical: string;
  SubVertical: string;
  Occupation: string;
  ItpRelationship: string;
  Nationality: string;
  SecondNationality: string;
  CountryLocation: string;
  CityLocation: string;
  Address: string;
  InstagramHandle: string;
  InstagramFollowers: number;
  InstagramLink: string;
  TiktokHandle: string;
  TiktokFollowers: number;
  TiktokLink: string;
  SnapchatHandle: string;
  SnapchatFollowers: number;
  SnapchatLink: string;
  TwitterHandle: string;
  TwitterFollowers: number;
  TwitterLink: string;
  FacebookHandle: string;
  FacebookFollowers: number;
  FacebookLink: string;
  YoutubeHandle: string;
  YoutubeFollowers: number;
  YoutubeLink: string;
  KSALicense: boolean;
  UAELicense: boolean;
  AgencyContactPerson: string;
  AgencyNumber: string;
  AgencyEmail: string;
  PreviousBrands: string;
  Bio: string;
  Notes: string;
  Status: string;
  influencerRating : Array<String>;
  itpAverageRating : number;
  influencerStatistics: InfluencerStatisticsModel[];
  influencerMetrics: influencermetrics;
 }

export interface InfluencerIdsAndNames{
  id: number;
  name: string;
}

export interface influencermetrics{
  id: number,
  CPE: number,
  CPM: number,
  influencerId: number,
  influencerName: string,
  marginOfProfit: number,
}

export interface getInfluencerNames{
  id: number;
  name: string;
}

export interface createInfluencerRemark{
  influencerId: number;
  note: string;
  createdById: number;
}

export interface influencerRemark{
  id: number;
  influencerId: number;
  note: string;
  createdById: number;
  createdAt: string;
  updatedAt: string;
  user: nameUser;

}

export interface influencerRemarkWithInfluencer{
  id: number;
  influencerId: number;
  createdById: number;
  influencer: influencerIdAndName;
  note : string;
  updatedAt: Date;
  createdAt: Date;
}

export interface influencerIdAndName{
  id: number;
  Name: string;
}





export interface nameUser{
  name: string;
}

export interface returnData{
  status: string;
  message: string;
  data?: any;
}



