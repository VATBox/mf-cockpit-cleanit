import { Component, Input } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';

import { UploadItem } from '~/shared/models/upload';

@Component({
  selector: 'uploads-table',
  templateUrl: './uploads-table.component.html',
  styleUrls: ['./uploads-table.component.scss'],
})
export class UploadsTableComponent {
  public firstLoading: boolean = false;
  public displayedColumns: string[] = ['id', 'date', 'createdBy', 'status', 'action'];
  public dataSource: MatTableDataSource<UploadItem>;

  @Input()
  public set uploads(uploads: UploadItem[] | null) {
    if (uploads) {
      this.dataSource.data = uploads;
      this.firstLoading = false;
    } else {
      this.firstLoading = true;
    }
  }

  constructor() {
    this.dataSource = new MatTableDataSource<UploadItem>([]);
  }
}
