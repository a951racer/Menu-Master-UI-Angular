import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication/authentication.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: any;
  authenticated: boolean;

  constructor(private _authenticationService: AuthenticationService,
              private _router: Router) {
    this.user = this._authenticationService.user;
    this.authenticated = this._authenticationService.isLoggedIn();
  }

  ngOnInit() {

  }

  login() {
    this._router.navigate(['/authentication/signin']);
  }

  signOut() {

  }

  signUp() {
    this._router.navigate(['/authentication/signup']);
  }
}
