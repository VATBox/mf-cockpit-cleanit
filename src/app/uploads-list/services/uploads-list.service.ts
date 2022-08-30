import { Injectable } from '@angular/core';
import {BehaviorSubject, filter, Observable, switchMap, tap} from 'rxjs';
import {Params} from "@angular/router";

import { UploadItem } from '~/shared/models/upload';
import { CleanitApiService } from '~/shared/services/ceanit/cleanit-api.service';


@Injectable()
export class UploadsListService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loadingSubject.asObservable();

  private offsetSubject = new BehaviorSubject<number>(1);
  public readonly offset$ = this.offsetSubject.asObservable();

  private routerParamsSubject = new BehaviorSubject<Params>({});
  public readonly routerParams$ = this.routerParamsSubject.asObservable();

  public readonly uploadsList$: Observable<UploadItem[]> = this.offset$.pipe(
    tap(() => {
      this.loadingSubject.next(true);
    }),
    switchMap((offset) =>
      this.apiService.getUploadsList(offset, 15).pipe(
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

  public setOffset(page: number): void {
    this.offsetSubject.next(page);
  }
}
