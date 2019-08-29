import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { FormationPage } from './formation.page';

// AFFICHAGE DU HEADER
import { SharedModule } from 'src/app/shared/shared.module';
import { CheckAuthGuard } from 'src/app/_core/guard/check-auth.guard';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild( [ { path: '', component: FormationPage, canActivate: [CheckAuthGuard] } ] )
  ],
  declarations: [ FormationPage ]
})
export class FormationPageModule {}
