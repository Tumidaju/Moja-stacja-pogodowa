import { ProfileDataStorage } from './../other/user.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { AppConfig } from '../../app.config';
import { UserProfile } from '../other/user.model';

@Injectable()
export class AccountService {
  mail: string;
  isLogged: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(undefined);
  role: BehaviorSubject<string> = new BehaviorSubject<string>(undefined);
  profileData: BehaviorSubject<UserProfile> = new BehaviorSubject<UserProfile>(
    undefined
  );
  constructor(private http: HttpClient, private config: AppConfig) {}

  isLoggedNext(x) {
    this.isLogged.next(x);
  }
  setRoleSubject(x) {
    this.role.next(x);
  }
  register(data: any) {
    return this.http.post(this.config.apiUrl + 'api/Account/Register', data);
  }
  setProfileData() {
    const user: ProfileDataStorage =
      JSON.parse(localStorage.getItem('currentUser')) || {};
    // tslint:disable-next-line: variable-name
    const _profileData: UserProfile = {
      firstName: user.userName || 'name',
      email: user.userName || 'email@sth.pl',
      phoneNum: 'qwe',
      userID: user.userID
    };
    this.profileData.next(_profileData);
  }
  // create new user

  // change password
  changePassword(data: any) {
    return this.http.post(
      this.config.apiUrl + 'api/Account/ChangePassword',
      data
    );
  }

  // restore password
  sendRestorePasswordEmail(Email) {
    return this.http.post(this.config.apiUrl + '/auth/restorePassword', {
      Email
    });
  }

  changePasswordByRestoringPassword(Token, NewPassword) {
    return this.http.post(
      this.config.apiUrl + '/auth/changePasswordByRestoringPassword',
      {
        Token,
        NewPassword
      }
    );
  }

  // recovery password
  passMailData(mail: string) {
    this.mail = mail;
  }
  getMailData() {
    const mail = this.mail;
    this.mail = undefined;
    return mail;
  }
  setLoginErrorString(status: number): string {
    switch (status) {
      case 0:
      case 500:
        return 'Błąd połączenia!';
      case 400:
        return 'Nieprawidłowy mail lub hasło';
    }
  }
}
