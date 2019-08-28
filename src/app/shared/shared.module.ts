import { NgModule, LOCALE_ID } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ReactiveFormsModule } from '@angular/forms';

import { HeaderComponent } from './components/header/header.component';
import { StarRaterComponent } from './components/star-rater/star-rater.component';
import { DayOfWeekPipe } from './pipes/day-of-week.pipe';
import { registerLocaleData } from '@angular/common';
import localeFrCH from '@angular/common/locales/fr-CH';
registerLocaleData(localeFrCH);


const COMPONENTS = [
  HeaderComponent,
  StarRaterComponent
];
const MODULES = [
  CommonModule,
  IonicModule,
  ReactiveFormsModule
];
const PIPES = [
  DayOfWeekPipe
];

@NgModule({
  declarations: [
    ...COMPONENTS,
    ...PIPES,
  ],
  imports: [
    ...MODULES
  ],
  exports: [
    ...COMPONENTS,
    ...MODULES,
    ...PIPES,
  ],
  providers: [
    { provide: LOCALE_ID, useValue: 'fr-CH'},
  ]
})
export class SharedModule { }
