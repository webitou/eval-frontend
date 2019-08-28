import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RatingFormationPage } from './rating-formation.page';

// AFFICHAGE DU HEADER
import { SharedModule } from 'src/app/shared/shared.module';
// import { PagerService } from 'src/app/_services/pager.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild( [ { path: '', component: RatingFormationPage } ] )
  ],
  providers: [
      // PagerService
  ],
  declarations: [ RatingFormationPage ]
})
export class RatingFormationPageModule {}

