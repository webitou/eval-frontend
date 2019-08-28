import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { CheckAuthGuard } from './_core/guard/check-auth.guard';

const routes: Routes = [
  {
    path: '',
    canActivate: [CheckAuthGuard],
    loadChildren: () => import( './shared/components/footer/footer.module' ).then( m => m.FooterPageModule )
  }
];
@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
