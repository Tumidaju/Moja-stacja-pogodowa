import { AuthGuard } from './auth/other/guard.auth';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PreloadSelectedModulesList } from './auth/other/preload';

const appRoutes: Routes = [
  { path: '', redirectTo: '/auth/login', pathMatch: 'full' },
  { path: 'auth', loadChildren: './auth/auth.module#AuthModule' },
  {
    path: 'app',
    loadChildren: './modules/main-view/main-view.module#MainViewModule',
    canLoad: [AuthGuard]
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(appRoutes, {
      preloadingStrategy: PreloadSelectedModulesList
    })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
