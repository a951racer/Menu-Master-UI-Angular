import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { apiConfig } from '../apiConfig';

@Injectable()
export class MealService {
  private _baseURL = apiConfig.mealURL;
  constructor (private _http: HttpClient) {}

/*** meal stuff ********************************/

list(): Observable<any> {
  return this._http
  .get(this._baseURL)
  .pipe(catchError(this.handleError));
}


readOne(mealId: string): Observable<any> {
  return this._http
  .get(this._baseURL + '/' + mealId)
  .pipe(catchError(this.handleError))
}

update(meal): Observable<any> {
  return this._http
  .put(this._baseURL + '/' + meal._id, meal)
  .pipe(catchError(this.handleError))
}

delete(meal): Observable<any> {
  return this._http
  .delete(this._baseURL + '/' + meal._id, meal)
  .pipe(catchError(this.handleError))
}

insert(meal): Observable<any> {
  return this._http
  .post(this._baseURL, meal)
  .pipe(catchError(this.handleError))
}



/***  Error Handling **************************************/

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error.message || 'Server error');
  }
}
