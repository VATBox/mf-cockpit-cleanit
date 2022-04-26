import { Component, Inject, Input, NgZone, OnDestroy, PLATFORM_ID } from '@angular/core';
import { isPlatformBrowser } from '@angular/common';

// amCharts imports
import * as am4core from '@amcharts/amcharts4/core';
import * as am4charts from '@amcharts/amcharts4/charts';
import am4themes_animated from '@amcharts/amcharts4/themes/animated';
import { JobModel } from '~/shared/models/data-puller.model';

@Component({
  selector: 'app-chart',
  templateUrl: './chart.component.html',
  styleUrls: ['./chart.component.css'],
})
export class ChartComponent implements OnDestroy {
  private chart: am4charts.XYChart;
  private _data: JobModel[];
  // public chartData = [
  //   {
  //     startedAt: '2009',
  //     reportsCount: 20,
  //     fetchedImages: 2,
  //   },
  //   {
  //     startedAt: '2010',
  //     reportsCount: 40,
  //     fetchedImages: 10,
  //   },
  //   {
  //     startedAt: '2011',
  //     reportsCount: 80,
  //     fetchedImages: 5,
  //   },
  //   {
  //     startedAt: '2012',
  //     reportsCount: 100,
  //     fetchedImages: 100,
  //   },
  //   {
  //     startedAt: '2013',
  //     reportsCount: 120,
  //     fetchedImages: 220,
  //   },
  //   {
  //     startedAt: '2014',
  //     reportsCount: 400,
  //     fetchedImages: 50,
  //   },
  // ];

  @Input()
  public set data(data: JobModel[]) {
    if (this.chart) {
      this.chart.dispose();
    }
    this._data = data;
    // const res = this.formatData();
    if (!!this._data) {
      this.init(this._data);
    }
  }

  constructor(@Inject(PLATFORM_ID) private platformId: any, private zone: NgZone) {}

  // Run the function only in the browser
  browserOnly(f: () => void) {
    if (isPlatformBrowser(this.platformId)) {
      this.zone.runOutsideAngular(() => {
        f();
      });
    }
  }

  public init(data: JobModel[]): void {
    // Chart code goes in here
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create('chartdiv', am4charts.XYChart);

      chart.paddingRight = 20;
      chart.paddingLeft = 0;

      /* Create axes */
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.renderer.minGridDistance = 30;

      // let categoryAxis = chart.xAxes.push(new am4charts.CategoryAxis());
      // categoryAxis.dataFields.category = 'started_at';
      // categoryAxis.renderer.minGridDistance = 30;

      /* Create value axis */
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());
      valueAxis.min = 0;

      this.createLineSeries(
        'Fetched Transactions',
        'transactionsCount',
        '#3ffd00',
        chart,
        valueAxis,
      );
      this.createLineSeries(
        'Failed Transactions',
        'failedTransactionsCount',
        '#bd2020',
        chart,
        valueAxis,
      );

      chart.data = data;
      this.chart = chart;
    });
  }

  private createLineSeries(
    name: string,
    fieldName: string,
    color: string,
    chart: any,
    valueAxis: any,
  ): void {
    let lineSeries = chart.series.push(new am4charts.LineSeries());
    lineSeries.name = name;
    lineSeries.dataFields.valueY = fieldName;
    lineSeries.dataFields.dateX = 'started_at';
    lineSeries.yAxis = valueAxis;

    lineSeries.stroke = am4core.color(color);
    lineSeries.strokeWidth = 3;
    if (lineSeries.tooltip) {
      lineSeries.tooltip.label.textAlign = 'middle';
    }

    let bullet = lineSeries.bullets.push(new am4charts.Bullet());
    bullet.fill = am4core.color(color); // tooltips grab fill from parent by default
    bullet.tooltipText =
      '[#fff font-size: 15px]{name} in {dateX}:\n[/][#fff font-size: 20px]{valueY}[/]';
    let circle = bullet.createChild(am4core.Circle);
    circle.radius = 4;
    circle.fill = am4core.color('#fff');
    circle.strokeWidth = 3;
  }

  public ngOnDestroy(): void {
    // Clean up chart when the component is removed
    this.browserOnly(() => {
      if (this.chart) {
        this.chart.dispose();
      }
    });
  }
}
