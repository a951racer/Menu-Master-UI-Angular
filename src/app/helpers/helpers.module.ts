import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RatingComponent } from './rating/rating.component';
import { UtcDatePipe } from './utc-date.pipe';
import { MaterialModule } from './material/material.module';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule
  ],
  declarations: [
    RatingComponent,
    UtcDatePipe,
  ],
  exports: [
    RatingComponent,
    UtcDatePipe,
    MaterialModule
  ]
})
export class HelpersModule { }
