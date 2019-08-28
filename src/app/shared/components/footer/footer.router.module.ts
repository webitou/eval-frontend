import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FooterPage } from './footer.page';

import { AuthGuard } from '../../../_core/guard/auth.guard';
import { CheckAuthGuard } from '../../../_core/guard/check-auth.guard';

const routes: Routes = [
  {
    path: 'tabs',
    component: FooterPage,
    canActivate: [CheckAuthGuard],
    children: [
      {
        path: 'formations',
        children: [
          {
            path: '',
            loadChildren: () =>
              import( '../../../features/formations/formations-list/formations.module' ).then( m => m.FormationsPageModule )
          }
        ]
      },
      {
        path: 'formation/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../../features/formations/formations-detail/formation.module' ).then( m => m.FormationPageModule )
          }
        ]
      },
      {
        path: 'formation/:id/eval',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../../features/rating/rating-formation/rating-formation.module' ).then( m => m.RatingFormationPageModule )
          }
        ]
      },
      {
        path: 'user/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../../features/auth/user-page/user-page.module').then(m => m.UserPageModule)
          }
        ]
      },
      {
        path: 'usermod/:id',
        children: [
          {
            path: '',
            loadChildren: () =>
              import('../../../features/auth/user-edit-page/user-edit-page.module').then(m => m.UserEditPageModule)
          }
        ]
      },
      {
        path: 'signin',
        children: [
          {
            path: '',
            loadChildren: () =>
              import( '../../../features/auth/signin/signin.module' ).then( m => m.SigninPageModule )
          }
        ]
      },
      {
        path: 'signup',
        children: [
          {
            path: '',
            loadChildren: () =>
              import( '../../../features/auth/signup/signup.module' ).then( m => m.SignupPageModule )
          }
        ]
      },
      {
        path: 'about',
        children: [
          {
            path: '',
            loadChildren: () =>
              import( '../../../features/about/about.module' ).then( m => m.AboutPageModule )
          }
        ]
      },
      {
        path: '',
        redirectTo: '/tabs/formations',
        pathMatch: 'full'
      }
    ]
  },
  {
    path: '',
    redirectTo: '/tabs/formations',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [ RouterModule.forChild( routes ) ],
  exports: [ RouterModule ]
})
export class FooterPageRoutingModule {}
