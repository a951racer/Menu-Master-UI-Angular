import 'rxjs';
import {Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { apiConfig } from '../apiConfig';

@Injectable()
export class RecipeService {
  private _baseURL = apiConfig.recipeURL;
  constructor (private _http: Http) {}

/*** recipe stuff ********************************/

list(): Observable<any> {
  return this._http
    .get(this._baseURL).pipe(
    map((res: Response) => res.json()),
    catchError(this.handleError));
}

readOne(recipeId: string): Observable<any> {
  return this._http
    .get(`${this._baseURL}/${recipeId}`).pipe(
    map((res: Response) => res.json()),
    catchError(this.handleError));
}

update(recipe): Observable<any> {
  return this._http
    .put(`${this._baseURL}/${recipe.id}`, recipe).pipe(
      map((res: Response) => res.json()),
      catchError(this.handleError));
}

delete(recipe): Observable<any> {
  return this._http
    .delete(`${this._baseURL}/${recipe.id}`).pipe(
      map((res: Response) => res.json()),
      catchError(this.handleError));
}

insert(recipe): Observable<any> {
  return this._http
    .post(this._baseURL, recipe).pipe(
      map((res: Response) => res.json()),
      catchError(this.handleError));
}



/***  Error Handling **************************************/

  private handleError(error: Response) {
    return Observable.throw(error.json().message || 'Server error');
  }
}
