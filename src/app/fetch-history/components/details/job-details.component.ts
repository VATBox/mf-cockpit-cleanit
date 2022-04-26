import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { ActivatedRoute } from '@angular/router';

import { FetchHistoryService } from '~/fetch-history/services/fetch-history.service';
import { JobModel } from '~/shared/models/data-puller.model';

@Component({
  selector: 'job-details',
  templateUrl: './job-details.component.html',
  styleUrls: ['./job-details.component.scss'],
})
export class JobDetailsComponent implements OnInit, OnDestroy {
  private routerSubscription: Subscription;
  public jobItem$: Observable<JobModel>;
  public loading$: Observable<boolean>;
  constructor(private route: ActivatedRoute, private service: FetchHistoryService) {}

  public ngOnInit(): void {
    this.jobItem$ = this.service.jobItem$;
    this.loading$ = this.service.loading$;
    this.routerSubscription = this.route.params.subscribe(param =>
      this.service.updateRouterParams(param),
    );
  }

  public ngOnDestroy(): void {
    if (typeof this.routerSubscription !== 'undefined') this.routerSubscription.unsubscribe();
  }
}
