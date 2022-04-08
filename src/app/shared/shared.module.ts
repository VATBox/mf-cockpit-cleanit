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

@NgModule({
  declarations: [
    // Components
    EmptyRouteComponent,
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
    EmptyRouteComponent,
    // Modules
    CommonModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    CdkModule,
    MaterialModule,
    // Directives,
  ],
  providers: [DataPullerApiService, ConfigurationAPIService, AccountSetupApiService],
  entryComponents: [],
})
export class SharedModule {}
