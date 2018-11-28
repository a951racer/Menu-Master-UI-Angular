import 'rxjs';
import {Observable} from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import { apiConfig } from '../apiConfig';

@Injectable()
export class DayService {
  private _baseURL = apiConfig.dayURL;
  private _mealURL = apiConfig.mealURL;
  private _recipeURL = apiConfig.recipeURL;
  private _ingredientURL = apiConfig.ingredientURL;
  constructor (private _http: Http) {}

/*** Day stuff ********************************/

list(): Observable<any> {
  return this._http
    .get(this._baseURL).pipe(
    map((res: Response) => res.json()),
    catchError(this.handleError));
}

readOne(dayId: string): Observable<any> {
  return this._http
    .get(`${this._baseURL}/${dayId}`).pipe(
    map((res: Response) => res.json()),
    catchError(this.handleError));
}

update(day): Observable<any> {
  return this._http
    .put(`${this._baseURL}/${day.id}`, day).pipe(
      map((res: Response) => res.json()),
      catchError(this.handleError));
}

delete(day): Observable<any> {
  return this._http
    .delete(`${this._baseURL}/${day.id}`).pipe(
      map((res: Response) => res.json()),
      catchError(this.handleError));
}

insert(day): Observable<any> {
  return this._http
    .post(this._baseURL, day).pipe(
      map((res: Response) => res.json()),
      catchError(this.handleError));
}



/***  Error Handling **************************************/

  private handleError(error: Response) {
    return Observable.throw(error.json().message || 'Server error');
  }
}
