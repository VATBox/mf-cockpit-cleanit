import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';

import { CdkModule } from './cdk.module';
import { MaterialModule } from './material.module';
import { CleanitApiService } from '~/shared/services/ceanit/cleanit-api.service';

@NgModule({
  declarations: [
    // Components
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
  ],
  providers: [CleanitApiService],
  entryComponents: [],
})
export class SharedModule {}
