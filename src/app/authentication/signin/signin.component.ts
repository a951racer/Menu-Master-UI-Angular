import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent {
  errorMessage: string;
  credentials: any = {};
  title = 'Sign In';
  subtitle = 'Welcome Back!';

  constructor(private _authenticationService: AuthenticationService,
              private _router: Router) { }

  signin() {
    this._authenticationService.signin(this.credentials).subscribe(
      result  => {
        localStorage.setItem('currentUser', JSON.stringify(result));
        this._router.navigate(['/']),
      error =>
        this.errorMessage = error
    });
  }

}
