import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { ManualFetchRoutingModule } from './manual-fetch-routing.module';
import { ManualFetchComponent } from './components/manual-fetch.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm/confirm-dialog.component';
import { FetchService } from './services/fetch.service';

@NgModule({
  imports: [ManualFetchRoutingModule, SharedModule],
  declarations: [ManualFetchComponent, ConfirmDialogComponent],
  entryComponents: [ConfirmDialogComponent],
  providers: [FetchService],
})
export class ManualFetchModule {}
