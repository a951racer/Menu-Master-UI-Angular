import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MaterialModule } from '../helpers/material/material.module';
import { HomeComponent } from './home.component';
import { HomeRoutes } from './home.routes';
import { SigninComponent } from '../authentication/signin/signin.component';
import { AuthenticationService } from '../authentication/authentication.service';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    MaterialModule,
    ReactiveFormsModule,
    FormsModule,
    RouterModule.forChild(HomeRoutes)
  ],
  declarations: [
    HomeComponent,
    SigninComponent
  ],
  entryComponents: [
    SigninComponent
  ],
  providers: [
    AuthenticationService
  ],
})
export class HomeModule { }