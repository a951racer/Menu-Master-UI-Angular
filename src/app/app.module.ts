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

import { HomeModule } from './home/home.module';
import { DayModule } from './day/day.module';
import { MealModule } from './meal/meal.module';

import { MealDialogComponent } from './meal/meal-dialog/meal-dialog.component';
import { ConfirmationDialogComponent } from './helpers/confirmation-dialog/confirmation-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MealDialogComponent,
    ConfirmationDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    HttpModule,
    MaterialModule,
    HomeModule,
    FlexLayoutModule,
    DayModule,
    MealModule,
    RouterModule.forRoot(AppRoutes),
  ],
  exports: [
    MealDialogComponent,
    ConfirmationDialogComponent
  ],
  providers: [
    customHttpProvider
  ],
  entryComponents: [
    MealDialogComponent,
    ConfirmationDialogComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
