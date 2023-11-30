export interface ClientModel {
  id: number;
  name: string;
  industry: string;
  updatedBy: number;
  createdAt: Date;
  updatedAt: Date;
}


export interface createClientModel {
  name: string;
  industry: string;
  updatedBy: number;
}
