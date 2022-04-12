import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { JobModel } from '~/shared/models/data-puller.model';
import { FetchHistoryService } from '~/fetch-history/services/fetch-history.service';

@Component({
  selector: 'fetch-history',
  templateUrl: './fetch-history.component.html',
  styleUrls: ['./fetch-history.component.scss'],
})
export class FetchHistoryComponent implements OnInit, OnDestroy {
  public jobList$: Observable<JobModel[]>;
  public loading$: Observable<boolean>;
  constructor(private service: FetchHistoryService) {}

  public ngOnInit(): void {
    this.jobList$ = this.service.jobList$;
    this.loading$ = this.service.loading$;
  }

  public ngOnDestroy(): void {}
}
