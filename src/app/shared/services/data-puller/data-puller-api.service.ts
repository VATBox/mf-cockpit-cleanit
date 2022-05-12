import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import {
  FetchRequestModel,
  HistoryResponseModel,
  JobModel,
} from '~/shared/models/data-puller.model';

@Injectable()
export class DataPullerApiService {
  public static DATA_PULLER_SERVICE_NAME = 'datapuller';
  public static API_BASE = `/api/${DataPullerApiService.DATA_PULLER_SERVICE_NAME}/v2`;
  public static FETCH_DATA_API = `${DataPullerApiService.API_BASE}/data/pull`;
  public static JOB_LIST_API = `${DataPullerApiService.API_BASE}/stats/jobs`;

  constructor(private http: HttpClient) {}

  public fetchData(data: FetchRequestModel): Observable<any> {
    return this.http.post(DataPullerApiService.FETCH_DATA_API, data);
  }

  public getJobList(accountId: number | null): Observable<HistoryResponseModel> {
    return this.http
      .post<HistoryResponseModel>(`${DataPullerApiService.JOB_LIST_API}`, {
        accountId,
      })
      .pipe(
        map(res => {
          return {
            ...res,
            jobs: res.jobs.sort(function(a, b) {
              return (new Date(b.started_at)).getTime() - (new Date(a.started_at)).getTime();
            }),
          };
        }),
      );
  }

  public getJobItem(jobId: string): Observable<JobModel> {
    return this.http
      .get<{ job: JobModel }>(`${DataPullerApiService.JOB_LIST_API}/${jobId}`)
      .pipe(map(res => res.job));
  }
}
