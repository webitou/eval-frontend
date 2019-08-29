import { Injectable } from '@angular/core';
import {
    HttpRequest,
    HttpHandler,
    HttpEvent,
    HttpInterceptor,
    HttpResponse,
    HttpErrorResponse
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor( private router: Router ) {}

  intercept( request: HttpRequest<any>, next: HttpHandler ): Observable<HttpEvent<any>> {

    const token = localStorage.getItem( 'authToken' );

    if ( token ) {
      request = request.clone( {
        setHeaders: {
          Authorization :  token
        }
      } );
    }

    if ( !request.headers.has( 'Content-Type' ) ) {
      request = request.clone( {
        setHeaders: {
          'content-type': 'application/json'
        }
      } );
    }
    request = request.clone( {
      headers: request.headers.set( 'Accept', 'application/json' )
    } );
    return next.handle( request ).pipe(
      map( ( event: HttpEvent<any> ) => {
        if ( event instanceof HttpResponse ) {
          console.log( 'interceptor event--->>> ', event );
        }
        return event;
      }),
      catchError( ( error: HttpErrorResponse ) => {
        console.log( error );
        console.log( this.router.url );
        if ( error.status === 401 &&  this.router.url.includes('formations' )) {
          // this.router.navigate( [ 'tabs/signin' ] );
          localStorage.removeItem( 'authToken' );
        }
        if ( error.status === 400 ) {
          alert( error.error );
        }
        return throwError( error );
      }));
  }

}
