import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { EvaluationsListPageComponent } from './containers/evaluations-list/evaluations-list-page.component';
import { EvaluationAddPageComponent } from './containers/evaluation-add/evaluation-add-page.component';
import { EvaluationEditPageComponent } from './containers/evaluation-edit/evaluation-edit-page.component';

import { FormationsListPageComponent } from './containers/formations-list/formations-list-page.component';
import { FormationAddPageComponent } from './containers/formation-add/formation-add-page.component';
import { FormationEditPageComponent } from './containers/formation-edit/formation-edit-page.component';

import { UsersListPageComponent } from './containers/users-list/users-list-page.component';
import { UserEditPageComponent } from './containers/user-edit/user-edit-page.component';

const routes: Routes = [
  {
    path: 'admin',
    children: [
      {
        path: 'evaluations',
        component: EvaluationsListPageComponent
      },
      {
        path: 'evaluation',
        component: EvaluationAddPageComponent
      },
      {
        path: 'evaluation/:id',
        component: EvaluationEditPageComponent
      },
      {
        path: 'formations',
        component: FormationsListPageComponent
      },
      {
        path: 'formation',
        component: FormationAddPageComponent
      },
      {
        path: 'formation/:id',
        component: FormationEditPageComponent
      },
      {
        path: 'users',
        component: UsersListPageComponent
      },
      {
        path: 'user/:id',
        component: UserEditPageComponent
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
