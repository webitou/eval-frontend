import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../../_services/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CheckAuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    this.checkAuth();
    console.log('CheckAuthGuard..');
    return true;
  }

  checkAuth() {
    this.authService.isLogged().toPromise()
    .then(res => console.log('loged', res)).catch(err => console.log('not loged', err));
    // this.authService.isLoggedIn$.toPromise().then(res => {
    //   console.log('checkAuth', res);
    //   if ( !res ) { 
    //     this.authService.isLogged().toPromise()
    //                     .then(res => console.log('loged', res)).catch(err => console.log('not loged', err));
    //   }
    // });
  }
}
