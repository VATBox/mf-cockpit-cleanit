import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { FetchHistoryComponent } from './components/fetch-history.component';
import { JobDetailsComponent } from './components/details/job-details.component';

const routes: Routes = [
  {
    path: '',
    component: FetchHistoryComponent,
  },
  { path: ':jobId', component: JobDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FetchHistoryRoutingModule {}
