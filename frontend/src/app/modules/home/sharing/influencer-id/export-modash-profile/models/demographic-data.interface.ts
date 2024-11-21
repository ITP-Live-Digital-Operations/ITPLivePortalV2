export interface AgeGenderData {
  ageRange: string;
  male: number;
  female: number;
  total: number;
}

export interface GenderSplitData {
  male: number;
  female: number;
}

export interface InterestData {
  name: string;
  weight: number;
  category?: string;
  rank?: number;
}

export interface CountryData {
  name: string;
  code?: string;
  weight: number;
  rank?: number;
}

