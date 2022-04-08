import { Injectable } from '@angular/core';
import { map } from 'rxjs';
import moment from 'moment';

import { ConfigurationAPIService } from '~/shared/services/configuration/configuration-api.service';
import { AccountSetupApiService } from '~/shared/services/account-setup/account-setup-api.service';
import { EntityStatus } from '~/shared/models/account.model';
import { DataPullerApiService } from '~/shared/services/data-puller/data-puller-api.service';
import { FetchRequestModel } from '~/manual-fetch/models/fetch.model';

@Injectable()
export class FetchService {
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
  ) {}

  public fetchData(data: FetchRequestModel) {
    const requestData = { ...data, pullDate: moment(data.pullDate).format('YYYY-MM-DD') };
    this.dataPullerApiService.fetchData(requestData).subscribe(
      res => {
        console.log(res);
      },
      err => console.log(err),
    );
  }
}
