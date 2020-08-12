import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MaterialModule } from '../helpers/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { IngredientComponent } from './ingredient.component';
import { IngredientRoutes } from './ingredient.routes';
import { IngredientService } from './ingredient.service';
import { IngredientDialogComponent } from './ingredient-dialog/ingredient-dialog.component';
import { IngredientImportDialogComponent } from './ingredient-import-dialog/ingredient-import-dialog.component';
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
    RouterModule.forChild(IngredientRoutes),
  ],
  declarations: [
    IngredientComponent,
    IngredientDialogComponent,
    IngredientImportDialogComponent
  ],
  entryComponents: [
    IngredientDialogComponent,
    IngredientImportDialogComponent
  ],
  providers: [
    IngredientService
  ],
  exports: [
  ]
})
export class IngredientModule { }
