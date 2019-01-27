import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { apiConfig } from '../apiConfig';

@Injectable()
export class DayService {
  private _baseURL = apiConfig.dayURL;
  constructor (private _http: HttpClient) {}

/*** day stuff ********************************/

list(): Observable<any> {
  return this._http
  .get(this._baseURL)
  .pipe(catchError(this.handleError));
}


readOne(dayId: string): Observable<any> {
  return this._http
  .get(this._baseURL + '/' + dayId)
  .pipe(catchError(this.handleError))
}

update(day): Observable<any> {
  return this._http
  .put(this._baseURL + '/' + day._id, day)
  .pipe(catchError(this.handleError))
}

delete(day): Observable<any> {
  return this._http
  .delete(this._baseURL + '/' + day._id, day)
  .pipe(catchError(this.handleError))
}

insert(day): Observable<any> {
  return this._http
  .post(this._baseURL, day)
  .pipe(catchError(this.handleError))
}



/***  Error Handling **************************************/

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error.message || 'Server error');
  }
}
