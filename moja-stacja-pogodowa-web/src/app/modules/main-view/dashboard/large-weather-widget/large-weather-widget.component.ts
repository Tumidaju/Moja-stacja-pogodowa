import { Component, OnInit, ViewChild, AfterViewInit, ElementRef } from '@angular/core';
import { Chart, ChartOptions } from 'chart.js';

@Component({
  selector: 'app-large-weather-widget',
  templateUrl: './large-weather-widget.component.html',
  styleUrls: ['./large-weather-widget.component.scss']
})
export class LargeWeatherWidgetComponent implements OnInit, AfterViewInit {
  @ViewChild('chart') speedCanvas: ElementRef;
  chart: any;

  ngOnInit() {}
  ngAfterViewInit() {
    this.chart = new Chart(this.speedCanvas.nativeElement, {
      type: 'line',
      data: {
        labels: ['0s', '10s', '20s', '30s', '40s', '50s', '60s'],
        datasets: [
          {
            label: 'Car Speed (mph)',
            data: [0, 59, 75, 20, 20, 55, 40]
          }
        ]
      },
      options: {
        legend: {
          display: false
        },
        scales: {
          xAxes: [
            {
              display: false
            }
          ],
          yAxes: [
            {
              display: false
            }
          ]
        }
      }
    });
  }
}
