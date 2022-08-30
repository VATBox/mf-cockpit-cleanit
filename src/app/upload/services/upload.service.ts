import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

import { CleanitApiService } from '~/shared/services/ceanit/cleanit-api.service';

@Injectable()
export class UploadService {
  private progressSubject = new BehaviorSubject<number>(0);
  public readonly progress$ = this.progressSubject.asObservable();

  constructor(
    private apiService: CleanitApiService,
    private router: Router,
  ) {}

  public uploadCleanItFile(file: File): void {
    this.apiService.uploadCleanItFile(file).subscribe((event: HttpEvent<any>) => {
      switch (event.type) {
        case HttpEventType.Sent:
          break;
        case HttpEventType.ResponseHeader:
          break;
        case HttpEventType.UploadProgress:
          this.progressSubject.next(
            Math.round((100 * event.loaded) / (event.total ? event.total : 1)),
          );
          break;
        case HttpEventType.Response:
          this.progressSubject.next(100);
          this.router.navigate(['/cleanit/uploads-list']).then();
      }
    });
  }

  public exportCsvTemplate(): void {
    const csvContent = ['companyId', 'reportId'].join(',');
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    const url = URL.createObjectURL(blob);
    link.setAttribute('href', url);
    link.setAttribute('download', 'upload-template');
    link.style.visibility = 'hidden';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  }

  public clearProgress() {
    this.progressSubject.next(0);
  }
}
