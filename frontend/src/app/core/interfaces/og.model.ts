export const teams = ['Production', 'Editing', 'Graphics'];

export interface returnData {
  status: string; // test for success or failure
  message: string; // used for notifications
  data?: any; // depends on the controller usually sends back same object as sent when edited or created || doesn't return data if error occurs
}

export interface ogShow{
  id: number;
  name: string;
  description: string;
  color: string;
  colorCode: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface ogShowCreate{
  name: string;
  description?: string;
  color: string;
  colorCode: string;
}

export interface ogShowEdit{
  name?: string;
  description?: string;
  color?: string;
  colorCode?: string;
}

// ----------------------------------------

export interface ogBookings{
  id: number;
  staffId: number;
  showId: number;
  team: string;
  shootName: string;
  numberofGuests: number;
  guestNames: string;
  startingDate: Date;
  endingDate: Date;
  progress: string;
  notes: string;
  createdAt: Date;
  updatedAt: Date;
  User: UserIdandName;
  ogshow: ogShow;
}

export interface ogBookingsCreate{
  staffId: number;
  showId: number;
  team: string;
  shootName: string;
  numberOfGuests: number;
  guestNames: string;
  startingDate: Date;
  endingDate: Date;
  progress?: string;
  notes: string;
}

export interface ogBookingsEdit{
  staffId?: number;
  showId?: number;
  team?: string;
  shootName?: string;
  numberofGuests?: number;
  guestNames?: string;
  startingDate?: Date;
  endingDate?: Date;
  progress?: string;
  notes?: string;
}

// ----------------------------------------

export interface ogBookingProductionForm{
  id: number;
  ogbookingId: number;
  locationOfShoot: string;
  fullShootBrief: string;
  equipmentNeeded: string;
  cameraNumber: string;
  nicMicNumber: string;
  paintingOrProps: string;
  createdAt: Date;
  updatedAt: Date;
  productionStaff: any;

}

export interface ogBookingCreateProductionForm{
  ogbookingId: number;
  locationOfShoot: string;
  fullShootBrief: string;
  equipmentNeeded: string;
  cameraNumber: string;
  nicMicNumber: string;
  paintingOrProps: string;

}

export interface ogBookingProductionFormEdit{
  locationOfShoot?: string;
  fullShootBrief?: string;
  equipmentNeeded?: string;
  cameraNumber?: string;
  nicMicNumber?: string;
  paintingOrProps?: string;
}

// ----------------------------------------
export interface ogBookingEditorForm{
  id: number;
  ogbookingId: number;
  deadlineDateDraft1: Date;
  deadlineDateDraft1Link: string;
  deadlineDateDraft1Comments: string;
  deadlineDateDraft2: Date;
  deadlineDateDraft2Link: string;
  deadlineDateDraft2Comments: string;
  deadlineDateFinal: Date;
  deadlineDateFinalLink: string;
  dateOfEpisodeGoingLive: Date;
  fullEpisodeBrief: string;
  linkOfFootage: string;
  music: string;
  brolls: string;
  graphics: string;
  textNeeded: string;
  guestSocialMediaLinks: string;
  requestedEditorId: number;
}


export interface ogBookingCreateEditorForm{
  ogbookingId: number;
  deadlineDateDraft1: Date;
  deadlineDateDraft1Link: string;
  deadlineDateDraft1Comments: string;
  deadlineDateDraft2: Date;
  deadlineDateDraft2Link: string;
  deadlineDateDraft2Comments: string;
  deadlineDateFinal: Date;
  deadlineDateFinalLink: string;
  dateOfEpisodeGoingLive: Date;
  fullEpisodeBrief: string;
  linkOfFootage: string;
  music: string;
  brolls: string;
  graphics: string;
  textNeeded: string;
  guestSocialMediaLinks: string;
  requestedEditorId: number;
}

export interface ogBookingEditorFormEdit{
  deadlineDateDraft1?: Date;
  deadlineDateDraft1Link?: string;
  deadlineDateDraft1Comments?: string;
  deadlineDateDraft2?: Date;
  deadlineDateDraft2Link?: string;
  deadlineDateDraft2Comments?: string;
  deadlineDateFinal?: Date;
  deadlineDateFinalLink?: string;
  dateOfEpisodeGoingLive?: Date;
  fullEpisodeBrief?: string;
  linkOfFootage?: string;
  music?: string;
  brolls?: string;
  graphics?: string;
  textNeeded?: string;
  guestSocialMediaLinks?: string;
  requestedEditorId?: number;
}

// ----------------------------------------

export interface ogBookingGraphicsForm{
  id: number;
  ogBookingId: number;
  deadlineDateDraft1: Date;
  deadlineDateDraft1Link: string;
  deadlineDateDraft1Comments: string;
  deadlineDateFinal: Date;
  deadlineDateFinalLink: string;
  dateOfThumbnailGoingLive: Date;
  fullThumbnailBrief: string;
  linkOfPictures: string;
  requestedGraphicDesignerId: number;

}

export interface ogBookingCreateGraphicsForm{
  ogBookingId: number;
  deadlineDateDraft1: Date;
  deadlineDateDraft1Link: string;
  deadlineDateDraft1Comments: string;
  deadlineDateFinal: Date;
  deadlineDateFinalLink: string;
  dateOfThumbnailGoingLive: Date;
  fullThumbnailBrief: string;
  linkOfPictures: string;
  requestedGraphicDesignerId: number;
}

export interface ogBookingGraphicsFormEdit{
  deadlineDateDraft1?: Date;
  deadlineDateDraft1Link?: string;
  deadlineDateDraft1Comments?: string;
  deadlineDateFinal?: Date;
  deadlineDateFinalLink?: string;
  dateOfThumbnailGoingLive?: Date;
  fullThumbnailBrief?: string;
  linkOfPictures?: string;
}


// ----------------------------------------

export interface UserIdandName{
  id: number;
  name: string;
}

export interface ogShowIdandName{
  id: number;
  name: string;
}
