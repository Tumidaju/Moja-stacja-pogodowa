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

  setProfileData() {
    const user = JSON.parse(localStorage.getItem('currentUser')) || {};
    const _profileData = {
      firstName: user.name || 'name',
      lastName: user.surname || 'surname',
      email: user.email || 'email@sth.pl',
      phoneNum: user.phoneNumber || 'qwe'
    };
    this.profileData.next(_profileData);
  }
  // create new user

  // change password
  changePassword(OldPassword, NewPassword) {
    return this.http.post(this.config.apiUrl + '/auth/changePassword', {
      OldPassword,
      NewPassword
    });
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
  passMailData(mail) {
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
