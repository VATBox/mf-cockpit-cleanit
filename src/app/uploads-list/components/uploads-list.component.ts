import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UploadsListService } from '~/uploads-list/services/uploads-list.service';
import { UploadItem } from '~/shared/models/upload';

@Component({
  selector: 'uploads-list',
  templateUrl: './uploads-list.component.html',
  styleUrls: ['./uploads-list.component.scss'],
})
export class UploadsListComponent implements OnInit, OnDestroy {
  public loading$: Observable<boolean>;
  public uploadsList$: Observable<UploadItem[]>;

  constructor(private service: UploadsListService) {}

  public ngOnInit(): void {
    this.loading$ = this.service.loading$;
    this.uploadsList$ = this.service.uploadsList$;
  }

  public onNextPage(page: number): void {
    this.service.setOffset(page);
  }

  public ngOnDestroy(): void {
    this.service.setOffset(1);
  }
}
