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
export class AuthGuard implements CanActivate {

  constructor(
    private authService: AuthService,
    private router: Router
    ) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot ) {
    const url: string = state.url;
    return this.checkLogin( url );
  }

  async checkLogin( url: string ): Promise<boolean> {
    let res = await this.authService.isLoggedIn$.toPromise().then(res => res);
    if ( res ) { return true; }
    // Store the attempted URL for redirecting
    this.authService.redirectUrl = url;

    // Navigate to the login page with extras
    this.router.navigate( [ '/tabs/signin' ] );
    return false;
  }
}
