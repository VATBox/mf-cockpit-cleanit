import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, switchMap, tap } from 'rxjs';
import { Params } from '@angular/router';
import { DataPullerApiService } from '~/shared/services/data-puller/data-puller-api.service';
import { AccountSetupApiService } from '~/shared/services/account-setup/account-setup-api.service';
import { EntityStatus } from '~/shared/models/account.model';

@Injectable()
export class FetchHistoryService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loadingSubject.asObservable();

  private accountIdSubject = new BehaviorSubject<number | null>(null);
  public readonly accountId$ = this.accountIdSubject.asObservable();

  private routerParamsSubject = new BehaviorSubject<Params>({});
  public readonly routerParams$ = this.routerParamsSubject.asObservable();

  public readonly accounts$ = this.accountApiService.getAllAccounts().pipe(
    map(accounts => {
      accounts = accounts.filter(acc => !!acc.name);
      return accounts.filter(
        acc => acc.status === EntityStatus.Active || acc.status === EntityStatus.Pending,
      );
    }),
  );

  public readonly jobList$ = this.accountId$.pipe(
    tap(() => {
      this.loadingSubject.next(true);
    }),
    switchMap(accountId =>
      this.apiService.getJobList(accountId).pipe(
        tap(() => {
          this.loadingSubject.next(false);
        }),
        map(res => res.jobs),
      ),
    ),
  );

  public readonly jobItem$ = this.routerParams$.pipe(
    filter(param => !!param['jobId']),
    tap(() => {
      this.loadingSubject.next(true);
    }),
    switchMap(res =>
      this.apiService.getJobItem(res['jobId']).pipe(
        tap(() => {
          this.loadingSubject.next(false);
        }),
      ),
    ),
  );

  constructor(
    private apiService: DataPullerApiService,
    private accountApiService: AccountSetupApiService,
  ) {}

  public selectAccount(accountId: number | null): void {
    this.accountIdSubject.next(accountId);
  }

  public updateRouterParams(params: Params): void {
    this.routerParamsSubject.next(params);
  }
}
