import { ConfigService } from './services/config.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatExpansionModule,
  MatTabsModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule
} from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProgressBarModule } from 'primeng/progressbar';
import { MainSettingsComponent } from './main-settings/main-settings.component';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings.routing';
import { WidgetSettingsComponent } from './widget-settings/widget-settings.component';
import { KeysSettingsComponent } from './keys-settings/keys-settings.component';

@NgModule({
  imports: [
    CommonModule,
    SettingsRoutingModule,
    MatTabsModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    FormsModule,
    ProgressBarModule,
    MatExpansionModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule
  ],
  declarations: [
    SettingsComponent,
    MainSettingsComponent,
    WidgetSettingsComponent,
    KeysSettingsComponent
  ],
  providers: [ConfigService]
})
export class SettingsModule {}
