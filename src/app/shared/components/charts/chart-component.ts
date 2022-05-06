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
    data = data.map(res => {
      return {
        ...res,
        started_at: new Date(res.started_at),
      };
    });
    this.browserOnly(() => {
      am4core.useTheme(am4themes_animated);

      let chart = am4core.create('chartdiv', am4charts.XYChart);

      chart.paddingRight = 20;
      chart.paddingLeft = 0;

      /* Create axes */
      let dateAxis = chart.xAxes.push(new am4charts.DateAxis());
      dateAxis.baseInterval = {
        timeUnit: 'day',
        count: 1,
      };
      dateAxis.renderer.minGridDistance = 30;

      /* Create value axis */
      let valueAxis = chart.yAxes.push(new am4charts.ValueAxis());

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
      chart.scrollbarX = new am4core.Scrollbar();
      chart.events.on('ready', function() {
        const maxDate = data.reduce((a, b) => {
          return new Date(a.started_at) > new Date(b.started_at) ? a : b;
        }).started_at as Date;
        const minDate = data.reduce((a, b) => {
          return new Date(a.started_at) < new Date(b.started_at) ? a : b;
        }).started_at as Date;
        const diffTimes = maxDate.getTime() - minDate.getTime();
        const diffDays = Math.ceil(diffTimes / (1000 * 3600 * 24));
        const firstDay = new Date(maxDate.getFullYear(), maxDate.getMonth(), maxDate.getDay() - 15);
        if (diffDays > 15) dateAxis.zoomToDates(firstDay, maxDate);
      });
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
