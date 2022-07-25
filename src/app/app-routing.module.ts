import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'cleanit',
    children: [
      {
        path: 'upload',
        loadChildren: () =>
          import('./upload/upload.module').then(m => m.UploadModule),
      },
      {
        path: 'uploads-list',
        loadChildren: () =>
          import('./uploads-list/uploads-list.module').then(m => m.UploadsListModule),
      },
    ],
  },
  { path: '**', redirectTo: 'cleanit/upload', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/' }],
})
export class AppRoutingModule {}
