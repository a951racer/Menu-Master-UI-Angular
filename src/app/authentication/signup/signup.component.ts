import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthenticationService } from '../authentication.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {
  user = {};
  errorMessage: string;
  
  constructor(private _authenticationService: AuthenticationService,
    private _router: Router) { }


  ngOnInit() {
  }

  signup() {
    this._authenticationService.signup(this.user).subscribe(
      result  => {
        localStorage.setItem('currentUser', JSON.stringify(result));
        this._router.navigate(['/contacts']), 
      error => 
        this.errorMessage = error
    });

  }
}
