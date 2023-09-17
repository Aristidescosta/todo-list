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

export interface ITask{
  title: string;
  category: string;
  docId?: string;
  completed: boolean;
  imageUrl: string;
  date: string;
  description: string;
}
