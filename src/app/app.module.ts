import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpModule, RequestOptions } from '@angular/http';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule} from "@angular/forms";

import { customHttpProvider } from '../assets/custom-http';

import { AppComponent } from './app.component';
import { AppRoutes } from './app.routes';

import { MaterialModule } from './helpers/material/material.module';

import { HelpersModule } from './helpers/helpers.module';

import { HomeModule } from './home/home.module';
import { IngredientModule } from './ingredient/ingredient.module';
import { DayModule } from './day/day.module';
import { MealModule } from './meal/meal.module';
import { RecipeModule } from './recipe/recipe.module';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpModule,
    HelpersModule,
    MaterialModule,
    FlexLayoutModule,
    HomeModule,
    IngredientModule,
    DayModule,
    MealModule,
    RecipeModule,
    RouterModule.forRoot(AppRoutes),
  ],
  exports: [

  ],
  providers: [
    customHttpProvider
  ],
  entryComponents: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
