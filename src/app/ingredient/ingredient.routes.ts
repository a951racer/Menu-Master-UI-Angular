import { Routes } from '@angular/router';
import { IngredientComponent } from './ingredient.component';

export const IngredientRoutes: Routes = [{
  path: 'ingredient',
  component: IngredientComponent,
  children: [
    {path: '', component: IngredientComponent},
  ],
}];
