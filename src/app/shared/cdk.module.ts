import { NgModule } from '@angular/core';
import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { ScrollingModule } from '@angular/cdk/scrolling';

@NgModule({
  imports: [LayoutModule, OverlayModule, ScrollingModule],
  exports: [LayoutModule, OverlayModule, ScrollingModule],
  providers: [],
})
export class CdkModule {}
