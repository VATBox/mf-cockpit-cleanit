import { Injectable } from '@angular/core';
import { BehaviorSubject, map, switchMap, tap } from 'rxjs';
import { DataPullerApiService } from '~/shared/services/data-puller/data-puller-api.service';

@Injectable()
export class FetchHistoryService {
  private loadingSubject = new BehaviorSubject<boolean>(false);
  public readonly loading$ = this.loadingSubject.asObservable();

  private offsetSubject = new BehaviorSubject<number>(0);
  public readonly offset$ = this.offsetSubject.asObservable();

  public readonly jobList$ = this.offset$.pipe(
    tap(() => {
      this.loadingSubject.next(true);
    }),
    switchMap(() =>
      this.apiService.getJobList().pipe(
        tap(() => {
          this.loadingSubject.next(false);
        }),
        map(res => res.jobs),
      ),
    ),
  );

  constructor(private apiService: DataPullerApiService) {}
}
