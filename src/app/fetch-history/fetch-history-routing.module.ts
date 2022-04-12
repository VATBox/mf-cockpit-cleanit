import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import {FetchHistoryComponent} from "./components/fetch-history.component";

const routes: Routes = [
  {
    path: '',
    component: FetchHistoryComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class FetchHistoryRoutingModule {}
