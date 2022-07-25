import { Component, OnDestroy, OnInit } from '@angular/core';
import { Observable } from 'rxjs';

import { UploadService } from '~/upload/services/upload.service';

@Component({
  selector: 'upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss'],
})
export class UploadComponent implements OnInit, OnDestroy {
  public progress$: Observable<number>;
  public fileError: string = '';
  public file: File | null = null;

  constructor(private service: UploadService) {}

  public ngOnInit(): void {
    this.file = null;
    this.progress$ = this.service.progress$;
    this.service.clearProgress();
  }

  public exportCsvTemplate(): void {
    this.service.exportCsvTemplate();
  }

  public onFileDropped(file: File): void {
    this.file = file;
    this.service.uploadFilesSimulator();
    // this.service.uploadCleanItFile(file);
  }

  public onFileError(error: { message: string }): void {
    this.file = null;
    this.fileError = error.message;
  }

  public ngOnDestroy(): void {}
}
