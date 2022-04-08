import { Component } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.scss'],
})
export class ConfirmDialogComponent {
  constructor(public dialog: MatDialogRef<ConfirmDialogComponent>) {}

  public close(): void {
    this.dialog.close(false);
  }

  public approve(): void {
    this.dialog.close(true);
  }
}
