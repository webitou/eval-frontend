import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/_services/auth.service';
import { AlertService } from 'src/app/_services/alert.service';

@Component({
  selector: 'app-signup',
  templateUrl: 'signup.page.html',
  styleUrls: [ 'signup.page.scss' ]
})
export class SignupPage implements OnInit {

  loginForm: FormGroup;
  email = '';
  password = '';
  // matcher = new MyErrorStateMatcher();
  isLoadingResults = false;

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private authService: AuthService,
    private alertService: AlertService
  ) {}

  ngOnInit() {
    const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    // CONTROLE DES CHAMPS
    this.loginForm = new FormGroup( {
      fullname: new FormControl(
        '',
        Validators.compose( [
          Validators.required,
          Validators.minLength( 5 )
        ] )
      ),
      email: new FormControl(
        '',
        Validators.compose( [
          Validators.required,
          Validators.minLength( 5 ),
          Validators.pattern( EMAILPATTERN )
        ] )
      ),
      password: new FormControl(
        '',
        Validators.compose( [
          Validators.required,
          Validators.minLength( 8 )
        ] )
      ),
      language: new FormControl(
        'fr',
        Validators.compose( [
          Validators.required,
          Validators.minLength( 2 )
        ] )
      ),
    } );
  }

  onFormSubmit( form: NgForm ) {
    this.authService.register( form )
      .subscribe( res => {
        if ( res.token ) {
          localStorage.setItem( 'authToken', res.token );
          this.router.navigate( [ 'tabs/formations' ] );
        }
      }, ( err ) => {
        console.log( err );
        this.alertService.error( err );
      });
  }

}
