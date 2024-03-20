export interface CelebrityModel {
    id: number;
    Name: string;
    Gender: string;
    Number: string;
    Email: string;
    MainContentLanguage: string;
    MainVertical: string;
    Occupation: string;
    Nationality: string;
    CountryLocation: string;
    InstagramHandle: string;
    InstagramFollowers: number;
    InstagramLink: string;
    TiktokHandle: string;
    TiktokFollowers: number;
    TiktokLink: string;
    TwitterHandle: string;
    TwitterFollowers: number;
    TwitterLink: string;
    FacebookHandle: string;
    FacebookFollowers: number;
    FacebookLink: string;
    YoutubeHandle: string;
    YoutubeFollowers: number;
    YoutubeLink: string;
    TwitchHandle: string;
    TwitchFollowers: number;
    TwitchLink: string;
    Agency: string;
    AgencyContactPerson: string;
    AgencyNumber: string;
    AgencyEmail: string;
    PreviousBrands: string;
    Bio: string;
    Notes: string;
    Status: string;
    PreviouslyWorkedWith: string;
    Game: string;
    createdAt: Date;
    updatedAt: Date;
    updatedBy: string;
}

export interface CelebrityIdandName{
    id: number;
    Name: string;
}

export interface CreateCelebrityRemark{
  celebrityId: number;
  note: string;
  createdById: number;
}

export interface CelebrityRemark{
  id: number;
  celebrityId: number;
  note: string;
  createdById: number;
  createdAt: Date;
  updatedAt: Date;
  user: NameUser;
}

export interface CelebrityRemarkWithCelebrity{
  id: number;
  celebrityId: number;
  note: string;
  createdById: number;
  createdAt: Date;
  updatedAt: Date;
  user: NameUser;
  celebrity: CelebrityIdandName;
}

export interface returnData{
  status: string;
  message: string;
  data?: any;
}

export interface NameUser{
  name: string;
}
