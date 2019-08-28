import { NgModule } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { AdminRoutingModule } from './admin-routing.module';
import { SharedModule } from 'src/app/shared/shared.module';

import { EvaluationsListPageComponent} from './containers/evaluations-list/evaluations-list-page.component';
import { EvaluationAddPageComponent } from './containers/evaluation-add/evaluation-add-page.component';
import { EvaluationEditPageComponent } from './containers/evaluation-edit/evaluation-edit-page.component';

import { FormationsListPageComponent } from './containers/formations-list/formations-list-page.component';
import { FormationAddPageComponent } from './containers/formation-add/formation-add-page.component';
import { FormationEditPageComponent } from './containers/formation-edit/formation-edit-page.component';

import { UsersListPageComponent } from './containers/users-list/users-list-page.component';
import { UserEditPageComponent } from './containers/user-edit/user-edit-page.component';


@NgModule({
  declarations: [
    EvaluationsListPageComponent,
    EvaluationAddPageComponent,
    EvaluationEditPageComponent,
    FormationsListPageComponent,
    FormationAddPageComponent,
    FormationEditPageComponent,
    UsersListPageComponent,
    UserEditPageComponent,
  ],
  imports: [
    AdminRoutingModule,

    IonicModule,
    CommonModule,
    FormsModule,
    SharedModule,
    RouterModule.forChild([{ path: 'evaluations', component: EvaluationsListPageComponent }]),
    RouterModule.forChild([{ path: 'evaluation', component: EvaluationAddPageComponent }]),
    RouterModule.forChild([{ path: ':id', component: EvaluationEditPageComponent }]),
    RouterModule.forChild([{ path: 'formations', component: FormationsListPageComponent }]),
    RouterModule.forChild([{ path: 'formation', component: FormationAddPageComponent }]),
    RouterModule.forChild([{ path: ':id', component: FormationEditPageComponent }]),
    RouterModule.forChild([{ path: 'users', component: UsersListPageComponent }]),
    RouterModule.forChild([{ path: ':id', component: UserEditPageComponent }])
  ]
})
export class AdminModule { }
