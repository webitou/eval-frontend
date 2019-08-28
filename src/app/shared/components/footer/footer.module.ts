import { IonicModule } from '@ionic/angular';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { FooterPageRoutingModule } from './footer.router.module';

import { FooterPage } from './footer.page';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    FormsModule,
    FooterPageRoutingModule
  ],
  declarations: [FooterPage]
})
export class FooterPageModule {}
