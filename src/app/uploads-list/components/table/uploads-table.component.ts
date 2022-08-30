import { Component, Input, Output, EventEmitter } from '@angular/core';
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
  public perPage: number = 15;
  @Output()
  public nextPage = new EventEmitter<number>();

  @Input()
  public set uploads(uploads: UploadItem[] | null) {
    if (uploads) {
      this.dataSource.data = this.dataSource.data.concat(uploads);
      this.firstLoading = false;
    } else {
      this.firstLoading = true;
    }
  }

  constructor() {
    this.dataSource = new MatTableDataSource<UploadItem>([]);
  }

  public onScroll(): void {
    this.nextPage.emit(Math.ceil(this.dataSource.data.length / this.perPage));
  }
}
