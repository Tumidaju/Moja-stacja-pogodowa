// tslint:disable:max-classes-per-file

export class UserProfile {
  firstName: string;
  email: string;
}
export class User extends UserProfile {
  password: string;
}
export class ProfileDataStorage {
  name: string;
  surname: string;
  role: string;
  email: string;
  loginData: LoginData;
}
export class LoginData {
  token: string;
}
