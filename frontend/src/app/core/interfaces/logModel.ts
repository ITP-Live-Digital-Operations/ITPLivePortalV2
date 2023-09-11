export interface LogModel {
    id: number,
    userID : number,
    influencerID: number,
    campaign: string,
    notes : string,
    time_to_reply : string,
    createdAt : Date,
    type : string,

    currency ?: string,
    rate ?: number,

    logItems : logItem[],
    packages : logPackage[],

  }


  interface logItem {
    id : number,
    logID : number,
    platform : string,
    deliverable : string,
    quantity : number,
    currency : string,
    rate : number,
  }

  interface logPackage {
    id : number,
    logID : number,
    platform : string,
    deliverable : string,
    quantity : number,
  }

