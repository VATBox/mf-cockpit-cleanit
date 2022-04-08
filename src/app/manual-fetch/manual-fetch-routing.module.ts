import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { ManualFetchComponent } from './components/manual-fetch.component';

const routes: Routes = [
  {
    path: '',
    component: ManualFetchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ManualFetchRoutingModule {}
