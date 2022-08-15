import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable, Subscription } from 'rxjs';
import { UploadItem } from '~/shared/models/upload';
import { ActivatedRoute } from '@angular/router';
import { UploadsListService } from '~/uploads-list/services/uploads-list.service';

@Component({
  selector: 'upload-details',
  templateUrl: './upload-details.component.html',
  styleUrls: ['./upload-details.component.scss'],
})
export class UploadDetailsComponent implements OnInit, OnDestroy {
  private routerSubscription: Subscription;
  public uploadItem$: Observable<UploadItem>;
  public loading$: Observable<boolean>;
  constructor(private route: ActivatedRoute, private service: UploadsListService) {}

  public ngOnInit(): void {
    this.uploadItem$ = this.service.uploadItem$;
    this.loading$ = this.service.loading$;
    this.routerSubscription = this.route.params.subscribe(param =>
      this.service.updateRouterParams(param),
    );
  }

  public ngOnDestroy(): void {
    if (typeof this.routerSubscription !== 'undefined') this.routerSubscription.unsubscribe();
  }
}
