import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { delay, Observable } from 'rxjs';
import { FetchRequestModel, HistoryResponseModel } from '~/shared/models/data-puller.model';

@Injectable()
export class DataPullerApiService {
  public static DATA_PULLER_SERVICE_NAME = 'datapuller';
  public static API_BASE = `/api/${DataPullerApiService.DATA_PULLER_SERVICE_NAME}/v2`;
  public static FETCH_DATA_API = `${DataPullerApiService.API_BASE}/data/pull`;
  public static JOB_LIST_API = `${DataPullerApiService.API_BASE}/stats/jobs`;

  constructor(private http: HttpClient) {}

  public fetchData(data: FetchRequestModel): Observable<any> {
    return this.http.post(DataPullerApiService.FETCH_DATA_API, data).pipe(delay(1000));
  }

  public getJobList(): Observable<HistoryResponseModel> {
    return this.http
      .post<HistoryResponseModel>(`${DataPullerApiService.JOB_LIST_API}`, {})
      .pipe(delay(1000));
  }
}
