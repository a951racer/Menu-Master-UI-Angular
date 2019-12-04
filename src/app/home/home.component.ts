import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material';
import { AuthenticationService } from '../authentication/authentication.service';
import { SigninComponent } from '../authentication/signin/signin.component'
import { SignupComponent } from '../authentication/signup/signup.component'
import { User } from '../user/user.model';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user: User;
  authenticated: boolean;
  dialogData: any;

  constructor(private _authenticationService: AuthenticationService,
              private _router: Router,
              public dialog: MatDialog) {
    this.user = this._authenticationService.user;
    this.authenticated = this._authenticationService.isLoggedIn();
  }

  ngOnInit() {

  }

  login() {
    this.dialogData = new User();
    this.dialogData.dialogTitle = 'Sign In';
    const dialogRef = this.dialog.open(SigninComponent, {
      width: '300px',
      height: 'auto',
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(credentials => {
      this._authenticationService.signin(credentials).subscribe(
        result  => {
          localStorage.setItem('currentUser', JSON.stringify(result))
          this.user = this._authenticationService.user;
          this.authenticated = this._authenticationService.isLoggedIn();
        //error =>
          //this.errorMessage = error
      });
    });
  }

  signOut() {

  }

  signUp() {
    this.dialogData = new User();
    this.dialogData.dialogTitle = 'Sign Up';
    const dialogRef = this.dialog.open(SignupComponent, {
      width: '300px',
      height: 'auto',
      data: this.dialogData
    });

    dialogRef.afterClosed().subscribe(credentials => {
      this._authenticationService.signup(credentials).subscribe(
        result  => {
          localStorage.setItem('currentUser', JSON.stringify(result))
          this.user = this._authenticationService.user;
          this.authenticated = this._authenticationService.isLoggedIn();
        //error =>
          //this.errorMessage = error
      });
    });
  }
}
