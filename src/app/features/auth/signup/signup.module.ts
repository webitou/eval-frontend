import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// AFFICHAGE DU HEADER
import { SharedModule } from 'src/app/shared/shared.module';

import { SignupPage } from './signup.page';

@NgModule( {
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild( [ { path: '', component: SignupPage } ] )
  ],
  declarations: [ SignupPage ]
} )
export class SignupPageModule {}
