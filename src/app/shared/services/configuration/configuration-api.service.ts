import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { DataPullerSource } from '~/shared/models/data-puller.model';

@Injectable()
export class ConfigurationAPIService {
  public static DYNOCONFIG = 'dynoconfig-service';
  public static GET_SOURCE_LIST_API = `/api/${
    ConfigurationAPIService.DYNOCONFIG
  }/v1/collections/data-puller-source`;

  constructor(private http: HttpClient) {}

  public getSourceList(): Observable<DataPullerSource[]> {
    return this.http.get<DataPullerSource[]>(ConfigurationAPIService.GET_SOURCE_LIST_API);
  }
}
