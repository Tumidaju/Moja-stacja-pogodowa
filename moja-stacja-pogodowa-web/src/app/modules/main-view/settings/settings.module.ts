import { ConfigService } from './services/config.service';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatExpansionModule,
  MatTabsModule,
  MatIconModule,
  MatInputModule,
  MatButtonModule,
  MatTableModule,
  MatListModule,
  MatMenuModule
} from '@angular/material';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { ProgressBarModule } from 'primeng/progressbar';
import { MainSettingsComponent } from './setting-tabs/main-settings/main-settings.component';
import { SettingsComponent } from './settings.component';
import { SettingsRoutingModule } from './settings.routing';
import { WidgetSettingsComponent } from './setting-tabs/widget-settings/widget-settings.component';
import { KeysSettingsComponent } from './setting-tabs/keys-settings/keys-settings.component';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { ListComponent } from './components/list/list.component';

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
    MatButtonModule,
    DragDropModule,
    MatTableModule,
    MatListModule,
    MatButtonModule,
    MatMenuModule
  ],
  declarations: [
    SettingsComponent,
    MainSettingsComponent,
    WidgetSettingsComponent,
    KeysSettingsComponent,
    ListComponent
  ],
  providers: [ConfigService]
})
export class SettingsModule {}
