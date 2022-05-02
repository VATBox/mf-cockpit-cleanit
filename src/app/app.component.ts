import { Component, OnInit } from '@angular/core';
import * as am4core from '@amcharts/amcharts4/core';

@Component({
  selector: 'app-root',
  template: '<router-outlet></router-outlet>',
})
export class AppComponent implements OnInit {
  public ngOnInit(): void {
    this.initAmCharts();
  }

  private initAmCharts() {
    am4core.addLicense('CH239071588');
    am4core.addLicense('MP280514346');
  }
}
