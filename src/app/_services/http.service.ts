import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class HttpService {

  user: any;

  constructor(
    // tslint:disable-next-line: variable-name
    private _http: HttpClient
  ) { }

  get( param: string ) {
    return this._http.get( param ).pipe(
      tap( res => console.log( 'http response-> ', res ) )
    );
  }

  post( param: string, data: any ) {
    return this._http.post( param, data ).pipe(
      tap( ( res: any ) => {
        if ( res.user ) { this.user = res.user; }
      })
    );
  }

  delete( param: string ) {
    return this._http.delete( param ).pipe(
      tap( ( res: any ) => {
        if ( res.user ) { this.user = res.user; }
      })
    );
  }

  logout() {
    this.user = null;
    localStorage.removeItem('authToken');
    localStorage.removeItem('authUser');
    // ROUTER NAVIGATE
  }

  // getUser() {
  //   console.log(localStorage.getItem('authUser'));
  //   this.user = JSON.parse(localStorage.getItem('authUser'));
  //   return this.user;
  // }
}
