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

//import { MealDialogComponent } from '../meal/meal-dialog/meal-dialog.component';
//import { ConfirmationDialogComponent } from '../helpers/confirmation-dialog/confirmation-dialog.component';

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
    //MealDialogComponent,
    //ConfirmationDialogComponent
  ],
  entryComponents: [
    DayDialogComponent,
    //MealDialogComponent,
    //ConfirmationDialogComponent
  ],
  exports: [
    //MealDialogComponent,
  ]
})
export class DayModule { }
