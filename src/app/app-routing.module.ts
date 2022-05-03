import { APP_BASE_HREF } from '@angular/common';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { EmptyRouteComponent } from '~/empty-route/empty-route.component';

const routes: Routes = [
  {
    path: 'manual-fetch',
    loadChildren: () => import('./manual-fetch/manual-fetch.module').then(m => m.ManualFetchModule),
  },
  {
    path: 'fetch-history',
    loadChildren: () => import('./fetch-history/fetch-history.module').then(m => m.FetchHistoryModule),
  },
  { path: '**', component: EmptyRouteComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
  providers: [{ provide: APP_BASE_HREF, useValue: '/mf-cockpit-data-puller' }],
})
export class AppRoutingModule {}
