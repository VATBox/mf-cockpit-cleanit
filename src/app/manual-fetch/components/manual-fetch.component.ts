import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';

import { FetchRequestModel } from '../models/fetch.model';
import { ConfirmDialogComponent } from './dialogs/confirm/confirm-dialog.component';
import { Observable } from 'rxjs';
import { DataPullerSource } from '~/shared/models/data-puller.model';
import { FetchService } from '~/manual-fetch/services/fetch.service';
import { Account } from '~/shared/models/account.model';

@Component({
  selector: 'manual-fetch',
  templateUrl: './manual-fetch.component.html',
  styleUrls: ['./manual-fetch.component.scss'],
})
export class ManualFetchComponent implements OnInit, OnDestroy {
  public fetchForm: FormGroup;
  public sources$: Observable<DataPullerSource[]>;
  public accounts$: Observable<Account[]>;

  constructor(private fb: FormBuilder, private dialog: MatDialog, private service: FetchService) {
    this.fetchForm = this.fb.group({
      accountId: new FormControl('', Validators.required),
      serviceName: new FormControl('', Validators.required),
      pullDate: new FormControl('', Validators.required),
    });
  }

  public ngOnInit(): void {
    this.sources$ = this.service.sources$;
    this.accounts$ = this.service.accounts$;
  }

  public fetchData(data: FetchRequestModel): void {
    let ref: MatDialogRef<ConfirmDialogComponent>;
    ref = this.dialog.open(ConfirmDialogComponent);
    ref.afterClosed().subscribe(result => {
      if (result) {
        this.service.fetchData(data);
      }
    });
  }

  public ngOnDestroy(): void {}
}
