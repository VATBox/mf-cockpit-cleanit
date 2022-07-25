import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { UploadsListRoutingModule } from './uploads-list-routing.module';
import { UploadsListComponent } from './components/uploads-list.component';
import { UploadsListService } from './services/uploads-list.service';
import { UploadsTableComponent } from './components/table/uploads-table.component';
import { UploadDetailsComponent } from './components/details/upload-details.component';

@NgModule({
  imports: [UploadsListRoutingModule, SharedModule],
  declarations: [UploadsListComponent, UploadsTableComponent, UploadDetailsComponent],
  entryComponents: [],
  providers: [UploadsListService],
})
export class UploadsListModule {}
