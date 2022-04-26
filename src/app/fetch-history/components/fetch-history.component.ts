import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { MatSelectChange } from '@angular/material/select';
import { Observable } from 'rxjs';

import { JobModel } from '~/shared/models/data-puller.model';
import { Account } from '~/shared/models/account.model';
import { FetchHistoryService } from '../services/fetch-history.service';
import {FormControl} from "@angular/forms";

@Component({
  selector: 'fetch-history',
  templateUrl: './fetch-history.component.html',
  styleUrls: ['./fetch-history.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FetchHistoryComponent implements OnInit, OnDestroy {
  public jobList$: Observable<JobModel[]>;
  public loading$: Observable<boolean>;
  public accounts$: Observable<Account[]>;
  public accountControl = new FormControl();
  constructor(private service: FetchHistoryService) {}

  public ngOnInit(): void {
    this.jobList$ = this.service.jobList$;
    this.loading$ = this.service.loading$;
    this.accounts$ = this.service.accounts$;
  }

  public selectAccount(data: MatSelectChange): void {
    this.service.selectAccount(data.value);
    if (!data.value) {
      this.accountControl.setValue(null);
    }
  }

  public ngOnDestroy(): void {
    this.service.selectAccount(null);
  }
}
