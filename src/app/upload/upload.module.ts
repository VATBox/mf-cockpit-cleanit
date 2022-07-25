import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { UploadRoutingModule } from './upload-routing.module';
import { UploadComponent } from './components/upload.component';
import { UploadService } from './services/upload.service';
import { DndDirective } from '~/upload/directives/dnd.directive';

@NgModule({
  imports: [UploadRoutingModule, SharedModule],
  declarations: [UploadComponent, DndDirective],
  entryComponents: [],
  providers: [UploadService],
})
export class UploadModule {}
