import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signout',
  templateUrl: './signout.component.html',
  styleUrls: ['./signout.component.scss']
})
export class SignoutComponent {
  errorMessage: string;
  credentials: any = {};
  title = 'Sign Out';
  subtitle = 'Buh-bye!';

  constructor(private _authenticationService: AuthenticationService,
              private _router: Router) { }

  signout() {
    this._authenticationService.signout(() => {
      localStorage.setItem('currentUser', null);
      this._router.navigate(['/']);  
    });
  }

}
