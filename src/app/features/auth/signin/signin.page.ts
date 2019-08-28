import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, NgForm, FormControl } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from 'src/app/_services/auth.service';
import { AlertService } from 'src/app/_services/alert.service';

import { ToastController } from '@ionic/angular';


import { Plugins } from '@capacitor/core';
const { Toast } = Plugins;


@Component({
  selector: 'app-signin',
  templateUrl: 'signin.page.html',
  styleUrls: [ 'signin.page.scss' ]
})
export class SigninPage implements OnInit {

  loginForm: FormGroup;
  email = '';
  password = '';
  // matcher = new MyErrorStateMatcher();
  isLoadingResults = false;

  constructor(
    private formBuilder: FormBuilder,
    // tslint:disable-next-line: variable-name
    private _router: Router,
    private authService: AuthService,
    private alertService: AlertService,

    private toastController: ToastController
  ) {}


  ngOnInit() {
    const EMAILPATTERN = /^[a-z0-9!#$%&'*+\/=?^_`{|}~.-]+@[a-z0-9]([a-z0-9-]*[a-z0-9])?(\.[a-z0-9]([a-z0-9-]*[a-z0-9])?)*$/i;
    // CONTROLE DES CHAMPS
    this.loginForm = new FormGroup( {
      email: new FormControl(
        'spider@test.ch',
        Validators.compose( [
          Validators.required,
          Validators.minLength( 5 ),
          Validators.pattern( EMAILPATTERN )
        ] )
      ),
      password: new FormControl(
        'spider1234',
        Validators.compose( [
          Validators.required,
          Validators.minLength( 8 )
        ] )
      ),
    } );
    // console.log( 'Signin Page logged --> ', this.authService.isLoggedIn );
  }

  onFormSubmit( form: NgForm ) {
    this.authService.login( form )
      .subscribe( res => {
        if ( res.token ) {
          localStorage.setItem( 'authToken', res.token );
          this._router.navigate( [ 'tabs/formations' ] );
          this.showSuccessConnect();
        }
      }, ( err ) => {
        console.log( err );
        this.alertService.error( err );
      });

  }

  register() {
    this._router.navigate( [ 'tabs/signup' ] );
  }

  async showSuccessConnect() {
    const toast = await this.toastController.create({
      message: 'Voue êtes connecté...',
      color: 'success',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }

  // async showToastWithCloseButton() {
  //   const toast = await this.toastController.create({
  //     message: 'Your files were successfully saved',
  //     showCloseButton: true,
  //     closeButtonText: 'Ok'
  //   });
  //   toast.present();
  // }

}
