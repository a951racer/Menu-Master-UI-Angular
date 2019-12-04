import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from '../interceptors/auth-interceptor';
import { RouterModule } from '@angular/router';
import { FlexLayoutModule } from '@angular/flex-layout';
import { ReactiveFormsModule} from "@angular/forms";

import {DataViewModule} from 'primeng/dataview';
import {ButtonModule} from 'primeng/button';
import {PickListModule} from 'primeng/picklist';
import {AccordionModule} from 'primeng/accordion';

import { AuthenticationModule } from '../app/authentication/authentication.module';
import { AuthenticationService } from './authentication/authentication.service';

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
    HttpClientModule,
    AuthenticationModule,
    HelpersModule,
    MaterialModule,
    FlexLayoutModule,
    HomeModule,
    IngredientModule,
    DayModule,
    MealModule,
    RecipeModule,
    DataViewModule,
    ButtonModule,
    PickListModule,
    AccordionModule,
    RouterModule.forRoot(AppRoutes),
  ],
  exports: [

  ],
  providers: [
    AuthenticationService,
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true }
  ],
  entryComponents: [

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
