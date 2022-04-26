import { Component, EventEmitter, Input, OnDestroy, OnInit, Output } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { JobModel } from '~/shared/models/data-puller.model';

@Component({
  selector: 'history-table',
  templateUrl: './history-table.component.html',
  styleUrls: ['./history-table.component.scss'],
})
export class HistoryTableComponent implements OnInit, OnDestroy {
  public displayedColumns = ['id', 'account', 'serviceName', 'startedAt', 'endedAt', 'action'];
  public dataSource: MatTableDataSource<JobModel>;
  @Input() public loading: boolean;
  @Input()
  set jobs(jobs: JobModel[]) {
    this.dataSource.data = jobs;
  }
  @Output()
  public deleteJobAction: EventEmitter<number> = new EventEmitter<number>();
  constructor() {
    this.dataSource = new MatTableDataSource<JobModel>([]);
  }

  public ngOnInit(): void {}

  public ngOnDestroy(): void {}
}
