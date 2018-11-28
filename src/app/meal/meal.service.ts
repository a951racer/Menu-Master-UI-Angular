import 'rxjs';
import {Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { apiConfig } from '../apiConfig';

@Injectable()
export class MealService {
  private _baseURL = apiConfig.mealURL;
  private _mealURL = apiConfig.mealURL;
  private _recipeURL = apiConfig.recipeURL;
  private _ingredientURL = apiConfig.ingredientURL;
  constructor (private _http: Http) {}

/*** meal stuff ********************************/

list(): Observable<any> {
  return this._http
    .get(this._baseURL).pipe(
    map((res: Response) => res.json()),
    catchError(this.handleError));
}

readOne(mealId: string): Observable<any> {
  return this._http
    .get(`${this._baseURL}/${mealId}`).pipe(
    map((res: Response) => res.json()),
    catchError(this.handleError));
}

update(meal): Observable<any> {
  return this._http
    .put(`${this._baseURL}/${meal.id}`, meal).pipe(
      map((res: Response) => res.json()),
      catchError(this.handleError));
}

delete(meal): Observable<any> {
  return this._http
    .delete(`${this._baseURL}/${meal.id}`).pipe(
      map((res: Response) => res.json()),
      catchError(this.handleError));
}

insert(meal): Observable<any> {
  return this._http
    .post(this._baseURL, meal).pipe(
      map((res: Response) => res.json()),
      catchError(this.handleError));
}



/***  Error Handling **************************************/

  private handleError(error: Response) {
    return Observable.throw(error.json().message || 'Server error');
  }
}
