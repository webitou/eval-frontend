import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { SharedModule } from 'src/app/shared/shared.module';

import { UserPageComponent } from './user-page.component';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([
      { path: '',
        children: [
        {
          path: '',
          component: UserPageComponent
        }
      ]}
    ])
  ],
  declarations: [ UserPageComponent ]
})
export class UserPageModule {}
