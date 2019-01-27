import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { apiConfig } from '../apiConfig';

@Injectable()
export class IngredientService {
  private _baseURL = apiConfig.ingredientURL;
  constructor (private _http: HttpClient) {}

/*** ingredient stuff ********************************/

list(): Observable<any> {
  return this._http
  .get(this._baseURL)
  .pipe(catchError(this.handleError));
}


readOne(ingredientId: string): Observable<any> {
  return this._http
  .get(this._baseURL + '/' + ingredientId)
  .pipe(catchError(this.handleError))
}

update(ingredient): Observable<any> {
  return this._http
  .put(this._baseURL + '/' + ingredient._id, ingredient)
  .pipe(catchError(this.handleError))
}

delete(ingredient): Observable<any> {
  return this._http
  .delete(this._baseURL + '/' + ingredient._id, ingredient)
  .pipe(catchError(this.handleError))
}

insert(ingredient): Observable<any> {
  return this._http
  .post(this._baseURL, ingredient)
  .pipe(catchError(this.handleError))
}



/***  Error Handling **************************************/

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error.message || 'Server error');
  }
}
