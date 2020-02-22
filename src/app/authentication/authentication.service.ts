import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { catchError, } from 'rxjs/operators';
import { Observable, throwError  } from 'rxjs';
import { apiConfig } from '../apiConfig';
//import { jsonpCallbackContext } from '@angular/common/http/src/module';

@Injectable()
export class AuthenticationService {
  public user = window['user'];
  public message;

  private _signinURL = apiConfig.signinURL;
  private _signupURL = apiConfig.signupURL;

  constructor (private http: HttpClient) {
  }

  isLoggedIn(): boolean {
    return (!!this.user);
  }

  signin(credentials: any): Observable<any> {
    const body = JSON.stringify(credentials);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json',
                               'Access-Control-Allow-Origin': '*',
                               'Access-Control-Allow-Heades': 'Origin, X-Requested-With, Content-Type, Accept'});
    const options = { 'headers': headers };
    this.user = this.http.post(this._signinURL, body, options)
      .pipe(
        catchError(this.handleError));
    return this.user;
  }

  signup(user: any): Observable<any> {
    const body = JSON.stringify(user);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    const options = { headers: headers };
    this.user =  this.http.post(this._signupURL, body, options)
      .pipe(catchError(this.handleError));
    return this.user;
  }

  signout(callback) {
    this.user = null;
    callback();
  }

  private handleError(error: HttpErrorResponse) {
    console.error(error.error.message);
    return throwError(error.error.message || 'Server error');
  }
}
