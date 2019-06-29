import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { AppConfig } from '../../app.config';
import { User } from '../other/user.model';
import { AccountService } from './account.service';

@Injectable()
export class AuthenticationService {
  profileData: BehaviorSubject<User> = new BehaviorSubject<User>(undefined);
  constructor(
    private http: HttpClient,
    private config: AppConfig,
    private userService: AccountService
  ) {}

  login(username: string, password: string) {
    const headers = new HttpHeaders({
      'Content-Type': 'application/x-www-form-urlencoded'
    });
    const body = `grant_type=${'password'}&username=${username}&password=${password}`;
    // const body = new URLSearchParams();
    // body.set('grant_type', 'password');
    // body.set('username', username);
    // body.set('password', password);
    // const headers = new HttpHeaders({
    //   'Content-Type': 'application/x-www-form-urlencoded'
    // });
    return this.http
      .post<any>(this.config.tokenUrl + 'Token', body, { headers })
      .map(data => {
        // login successful if there's a jwt token in the response
        if (data && data.access_token) {
          // store user details and jwt token in local storage to keep user logged in between page refreshes
          localStorage.setItem('currentUser', JSON.stringify(data));
          this.userService.isLoggedNext(true);
        }
        return data;
      });
  }

  logout() {
    // remove user from local storage to log user out
    this.userService.isLoggedNext(false);
    localStorage.removeItem('currentUser');
  }

  activateAccount(token: string) {
    const str = '/auth/activation/' + token;
    return this.http.get(this.config.apiUrl + str);
  }
  setProfileData() {
    // return this.http
    // .get<User>(this.config.apiUrl + '/surveytemplate/' + id)
    // .map(data => {
    //   return data;
    // });
  }
}
