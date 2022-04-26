import { animate, state, style, transition, trigger } from '@angular/animations';
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ReportModel } from '~/shared/models/data-puller.model';

@Component({
  selector: 'report-table',
  templateUrl: './report-table.component.html',
  styleUrls: ['./report-table.component.scss'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({ height: '0px', minHeight: '0' })),
      state('expanded', style({ height: '*' })),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})
export class ReportTableComponent implements OnInit, OnDestroy {
  public displayedColumns = ['id', 'createdAt', 'endedAt', 'transactionCount'];
  public dataSource: MatTableDataSource<ReportModel>;
  public expandedElement: ReportModel;
  @Input()
  set reports(reports: ReportModel[]) {
    this.dataSource.data = reports;
  }
  constructor() {
    this.dataSource = new MatTableDataSource<ReportModel>([]);
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {}
}
