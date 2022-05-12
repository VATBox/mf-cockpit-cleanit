import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { distinctUntilChanged, Observable } from 'rxjs';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';

import { JobModel } from '~/shared/models/data-puller.model';
import { Account } from '~/shared/models/account.model';
import { FetchHistoryService } from '../services/fetch-history.service';
import {ActivatedRoute} from "@angular/router";

@Component({
  selector: 'fetch-history',
  templateUrl: './fetch-history.component.html',
  styleUrls: ['./fetch-history.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class FetchHistoryComponent implements OnInit, OnDestroy {
  public reset: boolean = false;
  public jobList$: Observable<JobModel[]>;
  public loading$: Observable<boolean>;
  public accounts$: Observable<Account[]>;
  public accountForm: FormGroup;

  constructor(private route: ActivatedRoute, private service: FetchHistoryService, private fb: FormBuilder) {
    this.accountForm = this.fb.group({
      accountId: new FormControl(''),
    });
  }

  public ngOnInit(): void {
    this.loading$ = this.service.loading$;
    this.accounts$ = this.service.accounts$;
    this.jobList$ = this.service.jobList$;
    this.accountForm.valueChanges.pipe(distinctUntilChanged()).subscribe(form => {
      if (form.accountId && this.reset) {
        this.reset = false;
      }
      this.service.selectAccount(form.accountId);
    });
    this.route.queryParams.subscribe(res =>
    {
      if (res['accountId']) {
        this.accountForm.controls['accountId'].setValue(Number(res['accountId']));
      }
    });
  }

  public clearFilter(): void {
    this.reset = true;
  }

  public ngOnDestroy(): void {
    this.service.selectAccount(null);
  }
}
