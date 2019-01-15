import 'rxjs';
import {Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { apiConfig } from '../apiConfig';

@Injectable()
export class IngredientService {
  private _baseURL = apiConfig.ingredientURL;
  constructor (private _http: Http) {}

/*** ingredient stuff ********************************/

list(): Observable<any> {
  return this._http
    .get(this._baseURL).pipe(
    map((res: Response) => res.json()),
    catchError(this.handleError));
}

readOne(ingredientId: string): Observable<any> {
  return this._http
    .get(`${this._baseURL}/${ingredientId}`).pipe(
    map((res: Response) => res.json()),
    catchError(this.handleError));
}

update(ingredient): Observable<any> {
  return this._http
    .put(`${this._baseURL}/${ingredient._id}`, ingredient).pipe(
      map((res: Response) => res.json()),
      catchError(this.handleError));
}

delete(ingredient): Observable<any> {
  return this._http
    .delete(`${this._baseURL}/${ingredient._id}`).pipe(
      map((res: Response) => res.json()),
      catchError(this.handleError));
}

insert(ingredient): Observable<any> {
  return this._http
    .post(this._baseURL, ingredient).pipe(
      map((res: Response) => res.json()),
      catchError(this.handleError));
}



/***  Error Handling **************************************/

  private handleError(error: Response) {
    return Observable.throw(error.json().message || 'Server error');
  }
}
