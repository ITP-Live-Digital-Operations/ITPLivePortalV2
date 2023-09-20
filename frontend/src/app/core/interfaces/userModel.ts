export interface UserModel {
    id: number,
    name: string,
    email: string,
    password: string
    role: string,
    status: string,
    privilege_level: number,
    parentId: number,
    loginCount : number,
    position: string,
    location: string,
    onLeave: boolean,
  }


  export interface UserAuthentication {
    email: string;
    password: string;
  }


  export interface UAEHead {
    id: number,
    onLeave : boolean,
  }
