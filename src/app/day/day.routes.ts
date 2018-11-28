import { Routes } from '@angular/router';
import { DayComponent } from './day.component';

export const DayRoutes: Routes = [{
  path: 'day',
  component: DayComponent,
  children: [
    {path: '', component: DayComponent},
  ],
}];
