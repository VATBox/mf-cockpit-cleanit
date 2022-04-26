import { NgModule } from '@angular/core';

import { SharedModule } from '../shared/shared.module';
import { FetchHistoryRoutingModule } from './fetch-history-routing.module';
import { FetchHistoryComponent } from './components/fetch-history.component';
import { FetchHistoryService } from './services/fetch-history.service';
import { HistoryTableComponent } from './components/table/history-table.component';
import { JobDetailsComponent } from './components/details/job-details.component';
import {ReportTableComponent} from "~/fetch-history/components/details/table/report-table.component";

@NgModule({
  imports: [FetchHistoryRoutingModule, SharedModule],
  declarations: [FetchHistoryComponent, HistoryTableComponent, JobDetailsComponent, ReportTableComponent],
  entryComponents: [],
  providers: [FetchHistoryService],
})
export class FetchHistoryModule {}
