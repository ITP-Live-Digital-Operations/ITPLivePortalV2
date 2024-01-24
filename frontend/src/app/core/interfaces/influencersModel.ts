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



