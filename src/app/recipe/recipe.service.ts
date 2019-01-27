import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { apiConfig } from '../apiConfig';

@Injectable()
export class RecipeService {
  private _baseURL = apiConfig.recipeURL;
  constructor (private _http: HttpClient) {}

/*** recipe stuff ********************************/

list(): Observable<any> {
  return this._http
  .get(this._baseURL)
  .pipe(catchError(this.handleError));
}


readOne(recipeId: string): Observable<any> {
  return this._http
  .get(this._baseURL + '/' + recipeId)
  .pipe(catchError(this.handleError))
}

update(recipe): Observable<any> {
  return this._http
  .put(this._baseURL + '/' + recipe._id, recipe)
  .pipe(catchError(this.handleError))
}

delete(recipe): Observable<any> {
  return this._http
  .delete(this._baseURL + '/' + recipe._id, recipe)
  .pipe(catchError(this.handleError))
}

insert(recipe): Observable<any> {
  return this._http
  .post(this._baseURL, recipe)
  .pipe(catchError(this.handleError))
}



/***  Error Handling **************************************/

  private handleError(error: HttpErrorResponse) {
    return throwError(error.error.message || 'Server error');
  }
}
