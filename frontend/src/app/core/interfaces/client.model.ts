export interface ClientModel {
  id: number;
  name: string;
  industry: string;
  pocName: string;
  pocEmail: string;
  pocNumber: string;
  updatedBy: number;
  createdAt: Date;
  updatedAt: Date;
  brands: BrandModel[];
}


export interface editClientModel {
  name?: string;
  industry?: string;
  pocName?: string;
  pocEmail?: string;
  pocNumber?: string;
  updatedBy: number;
}




export interface BrandModel {
  id: number;
  name: string;
  clientId: number;
}


export interface createClientModel {
  name: string;
  industry: string;
  updatedBy: number;
}
