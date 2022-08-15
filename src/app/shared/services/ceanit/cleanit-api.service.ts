import { Injectable } from '@angular/core';
import { HttpClient, HttpEvent } from '@angular/common/http';
import { map, Observable } from 'rxjs';
import { UploadItem } from '~/shared/models/upload';

@Injectable()
export class CleanitApiService {
  public static BLUE_DOT_CLEAN_IT_SERVICE_NAME = 'cleanit';
  public static API_BASE = `/api/${CleanitApiService.BLUE_DOT_CLEAN_IT_SERVICE_NAME}/v2`;
  public static CLEAN_IT_UPLOADS_LIST_API = `${CleanitApiService.API_BASE}/uploads`;
  public static CLEAN_IT_UPLOAD_API = `${CleanitApiService.API_BASE}/upload`;

  constructor(private http: HttpClient) {}

  public uploadCleanItFile(file: File): Observable<HttpEvent<Object>> {
    return this.http.post(`${CleanitApiService.CLEAN_IT_UPLOAD_API}`, file, {
      headers: { ['Content-Type']: 'multipart/form-data' },
      reportProgress: true,
      observe: 'events',
    });
  }

  public getUploadsList(): Observable<UploadItem[]> {
    return this.http
      .post<{ uploads: UploadItem[] }>(`${CleanitApiService.CLEAN_IT_UPLOADS_LIST_API}`, {})
      .pipe(map(res => res.uploads));
  }

  public getUploadItem(uploadId: string): Observable<UploadItem> {
    return this.http
      .get<{ upload: UploadItem }>(`${CleanitApiService.CLEAN_IT_UPLOADS_LIST_API}/${uploadId}`)
      .pipe(map(res => res.upload));
  }
}
