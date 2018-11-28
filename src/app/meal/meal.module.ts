import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MaterialModule } from '../helpers/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { MealComponent } from './meal.component';
import { MealRoutes } from './meal.routes';
import { HelpersModule } from '../helpers/helpers.module';
//import { MealDialogComponent } from './meal-dialog/meal-dialog.component';
//import { ConfirmationDialogComponent } from '../helpers/confirmation-dialog/confirmation-dialog.component';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    HelpersModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(MealRoutes),
  ],
  declarations: [
    MealComponent,
    //MealDialogComponent,
    //ConfirmationDialogComponent
  ],
  entryComponents: [
    //MealDialogComponent,
    //ConfirmationDialogComponent
  ],
  exports: [
    //MealDialogComponent,
  ]
})
export class MealModule { }
