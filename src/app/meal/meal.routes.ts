import { Routes } from '@angular/router';
import { MealComponent } from './meal.component';

export const MealRoutes: Routes = [{
  path: 'meal',
  component: MealComponent,
  children: [
    {path: '', component: MealComponent},
  ],
}];
