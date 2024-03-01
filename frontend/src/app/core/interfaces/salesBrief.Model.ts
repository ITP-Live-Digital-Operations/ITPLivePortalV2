export interface getSalesBriefsNotViewedByTalent{
    status: string;
    data: number;
}

export interface getAllBriefs{
    status: string;
    data: BriefsDetails[];}

 export interface BriefsDetails{
    id: number;
    Agency: string;
    clientId: number;
    brandId: number;
    campaignId: number ;
    CampaignName: string;
    CampaignOverview: string;
    CampaignObjective: string;
    CampaignObjectiveDetails: string;
    NumberofRecommendations: number;
    Currency: string;
    Budget: string;
    CampaignStartDate: string;
    CampaignEndDate: string;
    CampaignMessagePhaseOne: string;
    CampaignMessagePhaseTwo: string;
    CampaignMessagePhaseThree: string;
    ContentDeliverables: string;
    BrandExclusivityDurationinDays: number;
    VideoProduction: boolean;
    VideoEditing: boolean;
    InfluencerAgeRange: string;
    InfluencerLocation: string;
    InfluencerCity: string;
    InfluencerNationality: string;
    InfluencerGender: string;
    InfluencerNotes: string;
    SimilarProfileLink: string;
    InfluencerInterest: string;
    InfluencerNumberOfFollowers: string;
    NoteForNumberOfFollowers: string;
    AudienceAgeRange: string;
    AudienceLocation: string;
    AudienceNationality: string;
    AudienceGender: string;
    PrimaryAudienceInterest: string;
    SecondaryAudienceInterest: string;
    ConfirmedInfluencerHandles: string;
    PreviousBrandAmbassadorsName: string;
    Strategy: boolean;
    Concept: boolean;
    Event: boolean;
    Performance: boolean;
    BudgetSheetId: number;
    PresentationId: number;
    PdfId: number;
    ItpDepartment: string;
    assigned: boolean;
    KPIs: string;
    Status: string;
    CreatedbyID: number;
    ViewedByTalent: boolean;
    Ready: boolean;
    Priority: number;
    ResultsViewed: boolean;
    signedOffByClient: boolean;
    createdAt: string;
    updatedAt: string;
 }

 export interface getAllAssignedBriefs{
    status: string;
    data: AllAssignedBriefsDetails[];
 }

 export interface AllAssignedBriefsDetails{
    id: number;
    Agency: string;
    clientId: number;
    brandId: number;
    campaignId: number;
    CampaignName: string;
    CampaignOverview: string;
    CampaignObjective: string;
    CampaignObjectiveDetails: string;
    NumberofRecommendations: number;
    Currency: string;
    Budget: string;
    CampaignStartDate: string;
    CampaignEndDate: string;
    CampaignMessagePhaseOne: string;
    CampaignMessagePhaseTwo: string;
    CampaignMessagePhaseThree: string;
    ContentDeliverables: string;
    BrandExclusivityDurationinDays: number;
    VideoProduction: boolean;
    VideoEditing: boolean;
    InfluencerAgeRange: string;
    InfluencerLocation: string;
    InfluencerCity: string;
    InfluencerNationality: string;
    InfluencerGender: string;
    InfluencerNotes: string;
    SimilarProfileLink: string;
    InfluencerInterest: string;
    InfluencerNumberOfFollowers: string;
    NoteForNumberOfFollowers: string;
    AudienceAgeRange: string;
    AudienceLocation: string;
    AudienceNationality: string;
    AudienceGender: string;
    PrimaryAudienceInterest: string;
    SecondaryAudienceInterest: string;
    ConfirmedInfluencerHandles: string;
    PreviousBrandAmbassadorsName: string;
    Strategy: boolean;
    Concept: boolean;
    Event: boolean;
    Performance: boolean;
    BudgetSheetId: number;
    PresentationId: number;
    PdfId: number;
    ItpDepartment: string;
    assigned: boolean;
    KPIs: string;
    Status: string;
    CreatedbyID: number;
    ViewedByTalent: boolean;
    Ready: boolean;
    Priority: number;
    ResultsViewed: boolean;
    signedOffByClient: boolean;
    createdAt: string;
    updatedAt: string;
}

  export interface Status{
    status: string;
  }

  export interface StatusAndData {
    status: string;
    data: number[];
  }
  export interface StatusAndMessage {
    status: string;
    message: string;
  }
 export interface getSalesBriefIdbyTaskId{
    status: string;
    data: BriefData;
 }
 export interface BriefData {
    brief_id: number;
  }
  export interface getSalesBriefWithFiles{
    status: string;
    data: SalesData;
  }
  
  export interface SalesData {
    id: number;
    Agency: string;
    clientId: number;
    brandId: number;
    campaignId: number;
    CampaignName: string;
    CampaignOverview: string;
    CampaignObjective: string;
    CampaignObjectiveDetails: string;
    NumberofRecommendations: number;
    Currency: string;
    Budget: string;
    CampaignStartDate: string;
    CampaignEndDate: string;
    CampaignMessagePhaseOne: string;
    CampaignMessagePhaseTwo: string;
    CampaignMessagePhaseThree: string;
    ContentDeliverables: string;
    BrandExclusivityDurationinDays: number;
    VideoProduction: boolean;
    VideoEditing: boolean;
    InfluencerAgeRange: string;
    InfluencerLocation: string;
    InfluencerCity: string;
    InfluencerNationality: string;
    InfluencerGender: string;
    InfluencerNotes: string;
    SimilarProfileLink: string;
    InfluencerInterest: string;
    InfluencerNumberOfFollowers: string;
    NoteForNumberOfFollowers: string;
    AudienceAgeRange: string;
    AudienceLocation: string;
    AudienceNationality: string;
    AudienceGender: string;
    PrimaryAudienceInterest: string;
    SecondaryAudienceInterest: string;
    ConfirmedInfluencerHandles: string;
    PreviousBrandAmbassadorsName: string;
    Strategy: boolean;
    Concept: boolean;
    Event: boolean;
    Performance: boolean;
    BudgetSheetId: number;
    PresentationId: number;
    PdfId: number;
    ItpDepartment: string;
    assigned: boolean;
    KPIs: string;
    Status: string;
    CreatedbyID: number;
    ViewedByTalent: boolean;
    Ready: boolean;
    Priority: number;
    ResultsViewed: boolean;
    signedOffByClient: boolean;
    createdAt: string;
    updatedAt: string;
    files: any[];
    client: ClientData;
    campaign: any;
  }
  
  export interface ClientData {
    id: number;
    name: string;
    industry: string;
    pocName: string;
    pocEmail: string;
    pocNumber: string;
    updatedBy: number;
    createdAt: string;
    updatedAt: string;
  }
  export interface getAllActiveBriefs{
    status: string;
    data: ActiveBriefsDetail[];
  }
  export interface ActiveBriefsDetail {
    id: number;
    Agency: string;
    clientId: number;
    brandId: number;
    campaignId: number;
    CampaignName: string;
    CampaignOverview: string;
    CampaignObjective: string;
    CampaignObjectiveDetails: string;
    NumberofRecommendations: number;
    Currency: string;
    Budget: string;
    CampaignStartDate: string;
    CampaignEndDate: string;
    CampaignMessagePhaseOne: string;
    CampaignMessagePhaseTwo: string;
    CampaignMessagePhaseThree: string;
    ContentDeliverables: string;
    BrandExclusivityDurationinDays: number;
    VideoProduction: boolean;
    VideoEditing: boolean;
    InfluencerAgeRange: string;
    InfluencerLocation: string;
    InfluencerCity: string;
    InfluencerNationality: string;
    InfluencerGender: string;
    InfluencerNotes: string;
    SimilarProfileLink: string;
    InfluencerInterest: string;
    InfluencerNumberOfFollowers: string;
    NoteForNumberOfFollowers: string;
    AudienceAgeRange: string;
    AudienceLocation: string;
    AudienceNationality: string;
    AudienceGender: string;
    PrimaryAudienceInterest: string;
    SecondaryAudienceInterest: string;
    ConfirmedInfluencerHandles: string;
    PreviousBrandAmbassadorsName: string;
    Strategy: boolean;
    Concept: boolean;
    Event: boolean;
    Performance: boolean;
    BudgetSheetId: number;
    PresentationId: number;
    PdfId: number;
    ItpDepartment: string;
    assigned: boolean;
    KPIs: string;
    Status: string;
    CreatedbyID: number;
    ViewedByTalent: boolean;
    Ready: boolean;
    Priority: number;
    ResultsViewed: boolean;
    signedOffByClient: boolean;
    createdAt: string;
    updatedAt: string;
  }
  export interface getAllBriefsWithTask {
    status: string;
    data: getAllBriefsWithTaskDetails[];
  }
  export interface getAllBriefsWithTaskDetails {
        id: number;
        Agency: string;
        clientId: number;
        brandId: number;
        campaignId: number;
        CampaignName: string;
        CampaignOverview: string;
        CampaignObjective: string;
        CampaignObjectiveDetails: string;
        NumberofRecommendations: number;
        Currency: string;
        Budget: string;
        CampaignStartDate: string;
        CampaignEndDate: string;
        CampaignMessagePhaseOne: string;
        CampaignMessagePhaseTwo: string;
        CampaignMessagePhaseThree: string;
        ContentDeliverables: string;
        BrandExclusivityDurationinDays: number;
        VideoProduction: boolean;
        VideoEditing: boolean;
        InfluencerAgeRange: string;
        InfluencerLocation: string;
        InfluencerCity: string;
        InfluencerNationality: string;
        InfluencerGender: string;
        InfluencerNotes: string;
        SimilarProfileLink: string;
        InfluencerInterest: string;
        InfluencerNumberOfFollowers: string;
        NoteForNumberOfFollowers: string;
        AudienceAgeRange: string;
        AudienceLocation: string;
        AudienceNationality: string;
        AudienceGender: string;
        PrimaryAudienceInterest: string;
        SecondaryAudienceInterest: string;
        ConfirmedInfluencerHandles: string;
        PreviousBrandAmbassadorsName: string;
        Strategy: boolean;
        Concept: boolean;
        Event: boolean;
        Performance: boolean;
        BudgetSheetId: number;
        PresentationId: number;
        PdfId: number;
        ItpDepartment: string;
        assigned: boolean;
        KPIs: string;
        Status: string;
        CreatedbyID: number;
        ViewedByTalent: boolean;
        Ready: boolean;
        Priority: number;
        ResultsViewed: boolean;
        signedOffByClient: boolean;
        createdAt: string;
        updatedAt: string;
        task: any;
        client: ClientData;
      } 
