import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Account } from '~/shared/models/account.model';

@Injectable()
export class AccountSetupApiService {
  public static ACCOUNT_SETUP_SERVICE_NAME = 'account-setup';
  public static API_BASE = `/api/${AccountSetupApiService.ACCOUNT_SETUP_SERVICE_NAME}/v2`;
  public static ADMIN_API = `${AccountSetupApiService.API_BASE}/admin`;

  constructor(private http: HttpClient) {}

  public getAllAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(`${AccountSetupApiService.ADMIN_API}/accounts`);
  }
}
