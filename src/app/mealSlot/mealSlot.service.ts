import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { apiConfig } from '../apiConfig';

@Injectable()
export class MealSlotService {
  private _baseURL = apiConfig.mealSlotURL;
  constructor (private _http: HttpClient) {}

/*** mealSlot stuff ********************************/

list(): Observable<any> {
  return this._http
  .get(this._baseURL)
  .pipe(catchError(this.handleError));
}


readOne(mealSlotId: string): Observable<any> {
  return this._http
  .get(this._baseURL + '/' + mealSlotId)
  .pipe(catchError(this.handleError))
}

update(mealSlot): Observable<any> {
  return this._http
  .put(this._baseURL + '/' + mealSlot._id, mealSlot)
  .pipe(catchError(this.handleError))
}

delete(mealSlot): Observable<any> {
  return this._http
  .delete(this._baseURL + '/' + mealSlot._id, mealSlot)
  .pipe(catchError(this.handleError))
}

insert(mealSlot): Observable<any> {
  return this._http
  .post(this._baseURL, mealSlot)
  .pipe(catchError(this.handleError))
}



/***  Error Handling **************************************/

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error.message || 'Server error');
  }
}
