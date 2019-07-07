import { WidgetService } from './services/widget.service';
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
  MatMenuModule,
  MatSelectModule,
  MatDialogModule,
  MatRadioModule,
  MatAutocompleteModule
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
import { WidgetFormComponent } from './setting-tabs/widget-settings/components/widget-form/widget-form.component';
import { WidgetFormDialogComponent } from './setting-tabs/widget-settings/components/widget-form-dialog/widget-form-dialog.component';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

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
    MatMenuModule,
    MatSelectModule,
    ProgressSpinnerModule,
    MatDialogModule,
    MatRadioModule,
    MatAutocompleteModule
  ],
  declarations: [
    SettingsComponent,
    MainSettingsComponent,
    WidgetSettingsComponent,
    KeysSettingsComponent,
    ListComponent,
    WidgetFormComponent,
    WidgetFormDialogComponent
  ],
  entryComponents: [WidgetFormDialogComponent],
  providers: [ConfigService]
})
export class SettingsModule {}
