import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { UploadsListComponent } from './components/uploads-list.component';
import { UploadDetailsComponent } from './components/details/upload-details.component';

const routes: Routes = [
  {
    path: '',
    component: UploadsListComponent,
  },
  { path: ':uploadId', component: UploadDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class UploadsListRoutingModule {}
