import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';
import { ToastController } from '@ionic/angular';

import { IUser } from '../_models';
import { Router } from '@angular/router';

const apiUrl = 'http://localhost:8080/api/v1/auth/';

@Injectable( {
  providedIn: 'root'
} )

export class AuthService {

  // tslint:disable-next-line: variable-name
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();
  redirectUrl: string;

  // user$: Observable<IUser>;

  // ADD
  private currentUserSubject: BehaviorSubject<IUser>;
  public currentUser: Observable<IUser>;

  constructor(
    // tslint:disable-next-line: variable-name
    private _http: HttpClient,
    private toastController: ToastController,
    // tslint:disable-next-line: variable-name
    private _router: Router,
    ) {

      this.currentUserSubject = new BehaviorSubject<IUser>(JSON.parse(localStorage.getItem('currentUser')));
      this.currentUser = this.currentUserSubject.asObservable();
    }

    public get currentUserValue(): IUser {
      return this.currentUserSubject.value;
    }

  login( data: any ): Observable<any> {
    return this._http.post<any>( apiUrl + 'signin/', data )
      .pipe(
        map( user => {
          // login successful if there's a jwt token in the response
          if ( user && user.token ) {
              // store user details and jwt token in local storage to keep user logged in between page refreshes
              // localStorage.setItem('currentUser', JSON.stringify(user));
              this.currentUserSubject.next( user );
          }
          return user;
      }),
        tap( _ => this._isLoggedIn.next(true) ),
        catchError( this.handleError( 'tabs/signin', [] ) )
      );
  }

  isLogged(): Observable<any> {
    return this._http.get<any>( apiUrl + 'isAuth' ).pipe(
      tap(res => res.auth ? this._isLoggedIn.next(true) : this._isLoggedIn.next(false)),
      tap(res => this.currentUserSubject.next( res.user )),
      tap(res => {
        console.log('Is Logged ....', res);
      }),
      // catchError(err => {console.log('err ....', err);return err})
    );
  }


  logout() {
    this._isLoggedIn.next(false);
    this.currentUserSubject.next(null);
    localStorage.removeItem('authToken');
    this._router.navigate(['/tabs/signin']);
  }

  register( data: any ): Observable<any> {
    return this._http.post<any>( apiUrl + 'signup', data )
      .pipe(
        tap( _ => this.log( 'Register OK' ) ),
        catchError( this.handleError( 'tabs/signin', [] ) )
      );
  }

// AFFICHAGE DU MESSAGE D'ERREUR
  async showMsgErrorLogin() {
    const toast = await this.toastController.create({
      message: `L'adresse mail ou le mot de passe n'est pas correct...`,
      color: 'danger',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }

  private handleError<T>( operation = 'operation', result?: T ) {
    return ( error: any ): Observable<T> => {

      console.error( error ); // log to console instead
      this.log( `${operation} failed: ${error.message}` );
      this.showMsgErrorLogin();
      return of( result as T );
    };
  }

  private log( message: string ) {
    console.log( message );
  }
}
