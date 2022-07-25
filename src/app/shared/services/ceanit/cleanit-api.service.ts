import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { delay, Observable, of } from 'rxjs';
import { UploadItem } from '~/shared/models/upload';

@Injectable()
export class CleanitApiService {
  public static BLUE_DOT_CLEAN_IT_SERVICE_NAME = 'clean-it';
  public static API_BASE = `/api/${CleanitApiService.BLUE_DOT_CLEAN_IT_SERVICE_NAME}/v1.0`;
  public static CLEAN_IT_UPLOAD_API = `${CleanitApiService.API_BASE}/upload`;

  public uploads: UploadItem[] = [
    {
      id: 1001,
      date: '2022-05-26T11:34:55.000Z',
      createdBy: 'karo.mkrtchyan@bluedotcorp.com',
      status: 'pending',
    },
    {
      id: 1002,
      date: '2022-05-26T11:34:55.000Z',
      createdBy: 'karo.mkrtchyan@bluedotcorp.com',
      status: 'pending',
    },
    {
      id: 1003,
      date: '2022-05-26T11:34:55.000Z',
      createdBy: 'karo.mkrtchyan@bluedotcorp.com',
      status: 'pending',
    },
    {
      id: 1004,
      date: '2022-05-26T11:34:55.000Z',
      createdBy: 'karo.mkrtchyan@bluedotcorp.com',
      status: 'pending',
    },
    {
      id: 1005,
      date: '2022-05-26T11:34:55.000Z',
      createdBy: 'karo.mkrtchyan@bluedotcorp.com',
      status: 'pending',
    },
    {
      id: 1006,
      date: '2022-05-26T11:34:55.000Z',
      createdBy: 'karo.mkrtchyan@bluedotcorp.com',
      status: 'pending',
    },
    {
      id: 1007,
      date: '2022-05-26T11:34:55.000Z',
      createdBy: 'karo.mkrtchyan@bluedotcorp.com',
      status: 'pending',
    },
    {
      id: 1008,
      date: '2022-05-26T11:34:55.000Z',
      createdBy: 'karo.mkrtchyan@bluedotcorp.com',
      status: 'pending',
    },
    {
      id: 1009,
      date: '2022-05-26T11:34:55.000Z',
      createdBy: 'karo.mkrtchyan@bluedotcorp.com',
      status: 'pending',
    },
    {
      id: 1010,
      date: '2022-05-26T11:34:55.000Z',
      createdBy: 'karo.mkrtchyan@bluedotcorp.com',
      status: 'pending',
    },
    {
      id: 1011,
      date: '2022-05-26T11:34:55.000Z',
      createdBy: 'karo.mkrtchyan@bluedotcorp.com',
      status: 'pending',
    },
    {
      id: 1012,
      date: '2022-05-26T11:34:55.000Z',
      createdBy: 'karo.mkrtchyan@bluedotcorp.com',
      status: 'pending',
    },
  ];

  constructor(private http: HttpClient) {}

  public uploadCleanItFile(file: File): Observable<HttpEvent<Object>> {
    return this.http.post(`${CleanitApiService.CLEAN_IT_UPLOAD_API}`, file, {
      headers: { ['Content-Type']: 'multipart/form-data' },
      reportProgress: true,
      observe: 'events',
    });
  }

  public getUploadsList(): Observable<UploadItem[]> {
    return of(this.uploads).pipe(delay(3000));
  }
}
