import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CdkModule } from './cdk.module';
import { MaterialModule } from './material.module';
import { EmptyRouteComponent } from '~/empty-route/empty-route.component';
import { DataPullerApiService } from '~/shared/services/data-puller/data-puller-api.service';
import { ConfigurationAPIService } from '~/shared/services/configuration/configuration-api.service';
import { AccountSetupApiService } from '~/shared/services/account-setup/account-setup-api.service';
import { ChartComponent } from '~/shared/components/charts/chart-component';
import { AccountByIdPipe } from '~/shared/pipes/account-by-id.pipe';
import { AccountAutocompleteComponent } from '~/shared/components/autocomplete/account-autocomplete.component';

@NgModule({
  declarations: [
    // Components
    AccountAutocompleteComponent,
    ChartComponent,
    EmptyRouteComponent,
    AccountByIdPipe,
    // Directives
  ],
  imports: [
    // Modules
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    CdkModule,
    MaterialModule,
  ],
  exports: [
    // Components
    AccountAutocompleteComponent,
    EmptyRouteComponent,
    ChartComponent,
    // Modules
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    CdkModule,
    MaterialModule,
    // Pipes,
    AccountByIdPipe,
  ],
  providers: [
    DataPullerApiService,
    ConfigurationAPIService,
    AccountSetupApiService,
    AccountByIdPipe,
  ],
  entryComponents: [],
})
export class SharedModule {}
