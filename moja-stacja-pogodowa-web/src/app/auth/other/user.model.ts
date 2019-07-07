// tslint:disable:max-classes-per-file

export class UserProfile {
  firstName: string;
  email: string;
  phoneNum: string;
  userID: string;
}
export class User extends UserProfile {
  password: string;
}
export interface ProfileDataStorage {
  '.expires': string;
  '.issued': string;
  access_token: string;
  expires_in: number;
  token_type: string;
  userID: string;
  userName: string;
}
export class LoginData {
  token: string;
}
