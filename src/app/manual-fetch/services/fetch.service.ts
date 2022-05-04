import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { Router } from '@angular/router';
import moment from 'moment';

import { ConfigurationAPIService } from '~/shared/services/configuration/configuration-api.service';
import { AccountSetupApiService } from '~/shared/services/account-setup/account-setup-api.service';
import { EntityStatus } from '~/shared/models/account.model';
import { DataPullerApiService } from '~/shared/services/data-puller/data-puller-api.service';
import { FetchRequestModel } from '~/shared/models/data-puller.model';

@Injectable()
export class FetchService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loadingSubject.asObservable();
  public readonly sources$ = this.configApiService.getSourceList();

  public readonly accounts$ = this.accountApiService.getAllAccounts().pipe(
    map(accounts => {
      accounts = accounts.filter(acc => !!acc.name);
      return accounts.filter(
        acc => acc.status === EntityStatus.Active || acc.status === EntityStatus.Pending,
      );
    }),
  );

  constructor(
    private configApiService: ConfigurationAPIService,
    private accountApiService: AccountSetupApiService,
    private dataPullerApiService: DataPullerApiService,
    private router: Router,
  ) {}

  public fetchData(data: FetchRequestModel) {
    this.loadingSubject.next(true);
    const requestData = { ...data, pullDate: moment(data.pullDate).format('YYYY-MM-DD') };
    this.dataPullerApiService.fetchData(requestData).subscribe(
      () => {
        this.loadingSubject.next(false);
        this.router.navigate(['../fetch-history']).then();
      },
      err => console.log(err),
    );
  }
}
