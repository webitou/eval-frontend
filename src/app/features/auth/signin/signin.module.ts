import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

// AFFICHAGE DU HEADER
import { SharedModule } from 'src/app/shared/shared.module';

import { SigninPage } from './signin.page';

@NgModule( {
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SharedModule,
    RouterModule.forChild( [ { path: '', component: SigninPage } ] )
  ],
  declarations: [ SigninPage ]
} )
export class SigninPageModule {}
