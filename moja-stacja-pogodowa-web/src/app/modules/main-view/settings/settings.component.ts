// tslint:disable: variable-name
import { ConfigService } from './services/config.service';
import {
  ChangeDetectionStrategy,
  Component,
  OnDestroy,
  OnInit
} from '@angular/core';
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { UserProfile } from './../../../auth/other/user.model';
import { AccountService } from './../../../auth/services/account.service';
import { first } from 'rxjs/operators';
import { WeatherApiKeys } from 'src/app/models/weather-api-keys.model';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class SettingsComponent implements OnInit, OnDestroy {
  // userInfo: UserProfile;
  userInfoSub: Subscription = new Subscription();
  userName: string;
  email: string;

  private _userInfo$: BehaviorSubject<UserProfile> = new BehaviorSubject<
    UserProfile
  >(undefined);
  private _weatherApiKeys$: BehaviorSubject<
    WeatherApiKeys
  > = new BehaviorSubject<WeatherApiKeys>(undefined);

  get userInfo$(): Observable<UserProfile> {
    if (this._userInfo$ && this._userInfo$.value) {
      this.setUserName();
    }
    return this._userInfo$.asObservable();
  }
  get weatherApiKeys$(): Observable<WeatherApiKeys> {
    return this._weatherApiKeys$.asObservable();
  }
  setUserName() {
    // this.userName = this._userInfo$.value.firstName;
    this.email = this._userInfo$.value.email;
  }

  constructor(
    private accountService: AccountService,
    private configService: ConfigService
  ) {}

  ngOnInit() {
    this.getUserInfo();
  }
  getWeatherApiApiKeys() {
    this.configService
      .getWeatherApiKeys(Number(this._userInfo$.value.userID))
      .pipe(first())
      .subscribe((data: WeatherApiKeys) => {
        this._weatherApiKeys$.next(data);
      });
  }
  getUserInfo() {
    this.userInfoSub = this.accountService.profileData.subscribe(data => {
      Promise.resolve(null).then(() => {
        this._userInfo$.next(data);
        this.getWeatherApiApiKeys();
      });
    });
  }
  ngOnDestroy() {}
}
