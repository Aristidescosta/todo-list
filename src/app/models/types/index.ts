export interface IUser {
  email: string;
  password: string;
}

export interface IAuth {
  accessToken: string;
  user: {
    name: string;
  };
}
