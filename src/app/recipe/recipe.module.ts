import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MaterialModule } from '../helpers/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RecipeComponent } from './recipe.component';
import { RecipeRoutes } from './recipe.routes';
import { RecipeDialogComponent } from './recipe-dialog/recipe-dialog.component';
import { QuantityDialogComponent } from './quantity-dialog/quantity-dialog.component'
import { HelpersModule } from '../helpers/helpers.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    FlexLayoutModule,
    HelpersModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forChild(RecipeRoutes),
  ],
  declarations: [
    RecipeComponent,
    RecipeDialogComponent,
    QuantityDialogComponent
  ],
  entryComponents: [
    RecipeDialogComponent,
    QuantityDialogComponent
  ],
  exports: [
  ]
})
export class RecipeModule { }
