import { WidgetApiModel, WidgetApi } from './../../../../models/widget.model';
import { Injectable } from '@angular/core';
import { AppConfig } from 'src/app/app.config';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class WidgetService {
  constructor(private http: HttpClient, private config: AppConfig) {}

  createWidget(widget: WidgetApiModel) {
    return this.http.post<WidgetApiModel>(
      this.config.apiUrlLong + 'widgets/createWidget',
      widget
    );
  }
  getWidgetList(userId: number): Observable<WidgetApi[]> {
    return this.http.post<WidgetApi[]>(
      this.config.apiUrlLong + 'widgets/getWidgets',
      { id: userId }
    );
  }
  deleteWidget(userId: number, widgetId: number): Observable<any> {
    return this.http.post<WidgetApi[]>(
      this.config.apiUrlLong + 'widgets/deleteWidget',
      { userId, id: widgetId }
    );
  }
}
