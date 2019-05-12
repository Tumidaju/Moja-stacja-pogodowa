import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
  ViewChild
} from '@angular/core';
import { MatMenuTrigger } from '@angular/material';

@Component({
  selector: 'app-bar',
  templateUrl: './app-bar.component.html',
  styleUrls: ['./app-bar.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppBarComponent {
  @ViewChild(MatMenuTrigger)
  trigger: MatMenuTrigger;
  private _url = '/app/admin/d/';
  private _showAdmin: boolean;
  private _showSendButton: boolean;
  private _showToggleButton: boolean;
  private _isLogged: boolean;
  private _isPreview: boolean;
  private _isLoading: boolean;
  private _accountRole: string;
  private _showCreatorButton: boolean;
  private _showAdminMenu: boolean;
  private _showBackButton: boolean;
  private _showUserInfo: boolean;
  // profileName = 'in progress';
  private _profileName: string;
  // inputs
  @Input()
  buttonText: string;
  @Input()
  logoIMG: string;
  @Input()
  profileIMG: string;

  // get set inputs

  @Input() isLogged: any;
  @Input() isLoading: any;
  @Input() accountRole: any;
  @Input() profileName: any;
  @Input() showCreatorButton: any;
  @Input() showAdminMenu: any;
  @Input() showUserInfo: any;
  @Input() showAdmin: any;

  // outputs
  @Output()
  showSurveyButton: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  openSidebarButton: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  redirectToButton: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  backToButton: EventEmitter<boolean> = new EventEmitter<boolean>();
  // child outputs
  @Output()
  logout: EventEmitter<boolean> = new EventEmitter<boolean>();
  @Output()
  routeSwitch: EventEmitter<string> = new EventEmitter<string>();
  @Output()
  progressButton: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor() {}

  // emit button actions
  redirectTo(data: string): void {
    this.redirectToButton.emit(this._url + data);
  }
  backTo(): void {
    this.backToButton.emit(true);
  }
  showSurvey(): void {
    this.showSurveyButton.emit(true);
  }
  openSidebar(): void {
    this.openSidebarButton.emit(true);
  }

  // emit child actions

  emitLogout() {
    this.logout.emit(true);
  }
  emitRouteSwitch(data: string) {
    this.routeSwitch.emit(data);
  }
  sendSurvey(): void {
    this.progressButton.emit(true);
  }
}
