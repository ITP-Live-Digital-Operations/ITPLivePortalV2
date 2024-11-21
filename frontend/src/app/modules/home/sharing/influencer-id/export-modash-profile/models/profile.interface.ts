import { AgeGenderData, CountryData, GenderSplitData, InterestData } from "./demographic-data.interface";
import { PlatformSelections } from "./platform-data.interface";

export interface ProfileCustomizations {
  name: string;
  bio: string;
  reasonToChoose: string;
  selectedPlatforms: PlatformSelections;
  engagementRate: number;
  avgLikes: number;
  genderSplit: number;
}

export interface ChartData {
  ageGender: AgeGenderData[];
  genderSplit: GenderSplitData;
  interests: InterestData[];
  countries: CountryData[];
}

export interface ExportOptions {
  format: 'image' | 'pptx';
  quality: number;
  includeLinks: boolean;
}
