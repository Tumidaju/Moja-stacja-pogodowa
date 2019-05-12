import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { SharedService } from '../../../services/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit, OnDestroy {


  constructor(private sharedService: SharedService) {}
  ngOnInit(): void {
    this.showUserInfo();
  }
  showUserInfo(): void {
    this.sharedService.showUser(true);
  }
  showAdminMenu(): void {
    this.sharedService.showAdminMain(true);
  }
  ngOnDestroy(): void {
  }
}
