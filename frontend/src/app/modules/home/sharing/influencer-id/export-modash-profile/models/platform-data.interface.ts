export interface PlatformSelections {
  instagram: boolean;
  tiktok: boolean;
  youtube: boolean;
  snapchat: boolean;
  twitch: boolean;
  twitter: boolean;
}

export interface PlatformData {
  type: PlatformType;
  username: string;
  followerCount: number;
  engagementRate: number;
  isEnabled: boolean;
  url?: string;
}

export enum PlatformType {
  Instagram = 'instagram',
  TikTok = 'tiktok',
  YouTube = 'youtube',
  Snapchat = 'snapchat',
  Twitch = 'twitch',
  Twitter = 'twitter'
}


