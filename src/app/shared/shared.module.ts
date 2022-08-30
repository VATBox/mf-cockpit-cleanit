import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import {InfiniteScrollModule} from "ngx-infinite-scroll";

import { CdkModule } from './cdk.module';
import { MaterialModule } from './material.module';
import { CleanitApiService } from '~/shared/services/ceanit/cleanit-api.service';
import { AccountByIdPipe } from '~/shared/pipes/account-by-id.pipe';
import { AccountSetupApiService } from '~/shared/services/account-setup/account-setup-api.service';


@NgModule({
  declarations: [
    // Components
    AccountByIdPipe,
    // Directives
  ],
  imports: [
    // Modules
    CommonModule,
    InfiniteScrollModule,
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

    // Modules
    CommonModule,
    InfiniteScrollModule,
    FormsModule,
    FlexLayoutModule,
    ReactiveFormsModule,
    RouterModule,
    HttpClientModule,
    CdkModule,
    MaterialModule,
    AccountByIdPipe,
    // Pipes,
  ],
  providers: [CleanitApiService, AccountByIdPipe, AccountSetupApiService],
  entryComponents: [],
})
export class SharedModule {}
