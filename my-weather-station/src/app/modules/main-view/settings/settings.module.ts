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
  declarations: [SettingsComponent, MainSettingsComponent]
})
export class SettingsModule {}
