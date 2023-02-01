import { Comment, Nullable } from "./post.interface";

export interface InitialState {
  token: Nullable<string>;
  isAuth: Nullable<boolean>;
  userInfo: User;
  users: Users;
  chosenUser: ChosenUser;
}

export interface Users {
  results: User[];
  totalCounts: number;
}

export interface AuthenticatedUser extends User {
  token: string;
  id: number
}

export interface User {
  username: Nullable<string>;
  email: Nullable<string>;
  jobPosition: Nullable<string>;
  skills: Nullable<string>;
  companyName: Nullable<string>;
  age: Nullable<number>;
  id?: number;
}
export interface ChosenUser extends User {
  comments: UserComment[];
}

export interface UserComment extends Comment {
  userId: number;
  id: number;
}

export interface ProfileOptions {
  username?: { value: string };
  email?: { value: string };
  jobPosition?: { value: string };
  skills?: { value: string[] };
  companyName?: { value: string };
  age?: { value: number };
}
