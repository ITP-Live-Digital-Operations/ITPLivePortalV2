export interface UserModel {
  id: number,
  name: string,
  email: string,
  password: string
  role: string,
  status: string,
  privilege_level: number,
  parentId: number,
}


export interface UserAuthentication {
  email: string;
  password: string;
}

