import { Injectable } from '@angular/core';
import {BehaviorSubject, filter, Observable, switchMap, tap} from 'rxjs';
import {Params} from "@angular/router";

import { UploadItem } from '~/shared/models/upload';
import { CleanitApiService } from '~/shared/services/ceanit/cleanit-api.service';


@Injectable()
export class UploadsListService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loadingSubject.asObservable();

  private offsetSubject = new BehaviorSubject<number | null>(null);
  public readonly offset$ = this.offsetSubject.asObservable();

  private routerParamsSubject = new BehaviorSubject<Params>({});
  public readonly routerParams$ = this.routerParamsSubject.asObservable();

  public readonly uploadsList$: Observable<UploadItem[]> = this.offset$.pipe(
    tap(() => {
      this.loadingSubject.next(true);
    }),
    switchMap(() =>
      this.apiService.getUploadsList().pipe(
        tap(() => {
          this.loadingSubject.next(false);
        }),
      ),
    ),
  );

  public readonly uploadItem$ = this.routerParams$.pipe(
    filter(param => !!param['uploadId']),
    tap(() => {
      this.loadingSubject.next(true);
    }),
    switchMap(res =>
      this.apiService.getUploadItem(res['uploadId']).pipe(
        tap(() => {
          this.loadingSubject.next(false);
        }),
      ),
    ),
  );

  constructor(private apiService: CleanitApiService) {}

  public updateRouterParams(params: Params): void {
    this.routerParamsSubject.next(params);
  }
}
