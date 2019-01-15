import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Router } from '@angular/router';
import { MaterialModule } from '../helpers/material/material.module';
import { FlexLayoutModule } from '@angular/flex-layout';

import { RecipeComponent } from './recipe.component';
import { RecipeRoutes } from './recipe.routes';
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
  ],
  entryComponents: [
  ],
  exports: [
  ]
})
export class RecipeModule { }
