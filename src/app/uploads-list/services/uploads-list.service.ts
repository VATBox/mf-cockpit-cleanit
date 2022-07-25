import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, switchMap, tap } from 'rxjs';

import { UploadItem } from '~/shared/models/upload';
import { CleanitApiService } from '~/shared/services/ceanit/cleanit-api.service';

@Injectable()
export class UploadsListService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loadingSubject.asObservable();

  private offsetSubject = new BehaviorSubject<number | null>(null);
  public readonly offset$ = this.offsetSubject.asObservable();

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

  constructor(private apiService: CleanitApiService) {}
}
