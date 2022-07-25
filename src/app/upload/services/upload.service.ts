import { Injectable } from '@angular/core';
import { CleanitApiService } from '~/shared/services/ceanit/cleanit-api.service';
import { HttpEvent, HttpEventType } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class UploadService {
  private progressSubject = new BehaviorSubject<number>(0);
  public readonly progress$ = this.progressSubject.asObservable();

  constructor(private apiService: CleanitApiService) {}

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
      }
    });
  }

  public uploadFilesSimulator() {
    setTimeout(() => {
      const progressInterval = setInterval(() => {
        if (this.progressSubject.getValue() === 100) {
          clearInterval(progressInterval);
        } else {
          this.progressSubject.next(this.progressSubject.getValue() + 5);
        }
      }, 200);
    }, 1000);
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
