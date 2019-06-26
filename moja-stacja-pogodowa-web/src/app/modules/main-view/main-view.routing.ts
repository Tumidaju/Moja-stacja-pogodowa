import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './../../auth/other/guard.auth';
import { MainViewComponent } from './main-view.component';

const mainRoutes: Routes = [
  {
    path: '',
    component: MainViewComponent,
    children: [
      {
        path: 'd',
        loadChildren: './dashboard/dashboard.module#DashboardModule',
        canLoad: [AuthGuard]
      },
      {
        path: 'users',
        loadChildren: './users/users.module#UsersModule',
        canLoad: [AuthGuard]
      },
      {
        path: 'settings',
        loadChildren: './settings/settings.module#SettingsModule',
        canLoad: [AuthGuard]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(mainRoutes)],
  exports: [RouterModule]
})
export class MainViewRoutingModule {}
