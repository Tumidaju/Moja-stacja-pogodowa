import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faChartBar, faEye } from '@fortawesome/free-regular-svg-icons';
import {
  faArrowLeft,
  faBars,
  faBriefcase,
  faClone,
  faCog,
  faEllipsisH,
  faEllipsisV,
  faFileExcel,
  faGraduationCap,
  faGripVertical,
  faPen,
  faPlus,
  faSearch,
  faSortDown,
  faSortUp,
  faTimes,
  faTrash,
  faUserAlt
} from '@fortawesome/free-solid-svg-icons';
import { AppComponent } from './app.component';
import { AppConfig } from './app.config';
import { AppRoutingModule } from './app.routing';
import { AuthGuard } from './auth/other/guard.auth';
import { GuidGuard } from './auth/other/guid.auth';
import { JwtInterceptor } from './auth/other/jwt.interceptor';
import { PreloadSelectedModulesList } from './auth/other/preload';
import { AccountService } from './auth/services/account.service';
import { AuthenticationService } from './auth/services/authentication.service';
import { BarModule } from './core/bar/app-bar.module';
import { AppFooterModule } from './core/footer/app-footer.module';
import { MaterialsModule } from './materials/materials.module';
import { SharedService } from './services/shared.service';
import { LoadingOverlayModule } from './shared/loading-overlay/loading-overlay.module';
import { LoadingScreenModule } from './shared/loading-screen/loading-screen.module';
import { WeatherService } from './modules/main-view/settings/services/weather.service';
import { WidgetService } from './modules/main-view/settings/services/widget.service';

library.add(
  faTimes,
  faBars,
  faPlus,
  faTrash,
  faSortDown,
  faSortUp,
  faGripVertical,
  faPen,
  faGraduationCap,
  faBriefcase,
  faCog,
  faEye,
  faClone,
  faUserAlt,
  faEllipsisV,
  faSearch,
  faEllipsisH,
  faChartBar,
  faArrowLeft,
  faFileExcel
);

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    MaterialsModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    LoadingOverlayModule,
    BarModule,
    AppFooterModule,
    LoadingScreenModule
  ],
  providers: [
    AuthenticationService,
    AccountService,
    SharedService,
    WeatherService,
    AuthGuard,
    WidgetService,
    GuidGuard,
    AppConfig,
    PreloadSelectedModulesList,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: JwtInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
