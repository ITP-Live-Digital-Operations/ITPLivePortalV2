export interface InfluencerProfile {
  id: number;
  Name: string;
  Gender?: string;
  Number?: string;
  Email?: string;
  MainContentLanguage?: string;
  SubContentLang?: string;
  MainVertical?: string;
  SubVertical?: string;
  Occupation?: string ;
  ItpRelationship?: string;
  Nationality?: string;
  SecondNationality?: string;
  CountryLocation?: string;
  CityLocation?: string;
  Address?: string;
  InstagramHandle?: string;
  InstagramFollowers?: number;
  InstagramLink?: string;
  TiktokHandle?: string;
  TiktokFollowers?: number;
  TiktokLink?: string;
  SnapchatHandle?: string;
  SnapchatFollowers?: number;
  SnapchatLink?: string;
  TwitterHandle?: string;
  TwitterFollowers?: number;
  TwitterLink?: string;
  FacebookHandle?: string;
  FacebookFollowers?: number;
  FacebookLink?: string;
  YoutubeHandle?: string;
  YoutubeFollowers?: number;
  YoutubeLink?: string;
  TwitchHandle?: string;
  TwitchFollowers?: number;
  TwitchLink?: string;
  TelegramHandle?: string;
  TelegramFollowers?: number;
  TelegramLink?: string;
  VKHandle?: string;
  VKFollowers?: number;
  VKLink?: string;
  KSALicense?: boolean;
  UAELicense?: boolean;
  AgencyContactPerson?: string;
  AgencyNumber?: string;
  AgencyEmail?: string;
  PreviousBrands?: string;
  Bio?: string;
  Notes?: string;
  Status?: string;
  updatedBy?: number;
  profilePicture?: string;
  ageGroup?: string;
  avgComments?: number;
  engagementRate?: number;
  createdAt: string;
  updatedAt: string;
  instagramProfile?: InstagramProfile;
  youtubeProfile?: YouTubeProfile;
  tiktokProfile?: TikTokProfile;
  influencerRating?: any[];
  user?: User;
  influencerStatistics?: any[];
  influencerMetrics?: InfluencerMetrics;
}

interface User {
  id: number;
  name: string;
  email: string;
  password: string;
  status: string;
  role: string;
  privilege_level: number;
  parentId?: number;
  hash: string;
  loginCount: number;
  position: string;
  location?: string;
  team?: string;
  onLeave: boolean;
  createdAt: string;
  updatedAt: string;
}

interface InfluencerMetrics {
  id: number;
  influencerId: number;
  influencerName: string;
  CPE?: number;
  CPM?: number;
  marginOfProfit?: number;
  updatedAt: string;
  createdAt: string;
}

export interface InstagramProfile {
  id: number;
  influencerId: number;
  userId?: string;
  username: string;
  fullName?: string;
  profilePicture?: string;
  bio?: string;
  isPrivate?: boolean;
  isVerified?: boolean;
  accountType?: string;
  followerCount?: number;
  followingCount?: number;
  postCount?: number;
  avgLikes?: number;
  avgComments?: number;
  avgReelsPlays?: number;
  engagementRate?: number;
  city?: string;
  country?: string;
  language?: string;
  gender?: string;
  ageGroup?: string;
  paidPostPerformance?: any; // You might want to define a more specific type if you know the structure
  createdAt: string;
  updatedAt: string;
}

export interface YouTubeProfile {
  id: number;
  influencerId: number;
  userId?: string;
  username: string;
  fullName?: string;
  profilePicture?: string;
  description?: string;
  isVerified?: boolean;
  subscriberCount?: number;
  videoCount?: number;
  avgViews?: number;
  avgLikes?: number;
  avgComments?: number;
  totalViews?: number;
  engagementRate?: number;
  city?: string;
  country?: string;
  gender?: string;
  ageGroup?: string;
  createdAt: string;
  updatedAt: string;
}

export interface TikTokProfile {
  id: number;
  influencerId: number;
  userId?: string;
  secUid?: string;
  username: string;
  fullName?: string;
  profilePicture?: string;
  bio?: string;
  isPrivate?: boolean;
  isVerified?: boolean;
  followerCount?: number;
  followingCount?: number;
  postCount?: number;
  avgLikes?: number;
  avgViews?: number;
  avgComments?: number;
  totalLikes?: number;
  engagementRate?: number;
  city?: string;
  country?: string;
  gender?: string;
  ageGroup?: string;
  createdAt: string;
  updatedAt: string;
}


