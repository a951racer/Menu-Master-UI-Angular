import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MaterialModule } from '../helpers/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

import { DayComponent } from './day.component';
import { DayRoutes } from './day.routes';
import { HelpersModule } from '../helpers/helpers.module';

import { DayDialogComponent } from './day-dialog/day-dialog.component';
import { MealSlotDialogComponent } from './mealSlot-dialog/mealSlot-dialog.component';
//import { ConfirmationDialogComponent } from '../helpers/confirmation-dialog/confirmation-dialog.component';

import { DayService } from './day.service';
import { MealSlotService } from '../mealSlot/mealSlot.service';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    HelpersModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(DayRoutes),
  ],
  declarations: [
    DayComponent,
    DayDialogComponent,
    MealSlotDialogComponent
    //ConfirmationDialogComponent
  ],
  entryComponents: [
    DayDialogComponent,
    MealSlotDialogComponent,
    //ConfirmationDialogComponent
  ],
  exports: [
    //MealDialogComponent,
  ],
  providers: [
    DayService,
    MealSlotService
  ]
})
export class DayModule { }
