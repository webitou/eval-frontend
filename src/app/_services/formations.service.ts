import { Injectable } from '@angular/core';
import { FormationsPage } from '../features/formations/formations-list/formations.page';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap, map } from 'rxjs/operators';

const apiUrl = 'http://localhost:8080/api/v1/mgm-formation';

@Injectable({
  providedIn: 'root'
})
export class FormationService {

  constructor( private http: HttpClient ) { }

  getFormations(): Observable<FormationsPage[]> {
    return this.http.get<FormationsPage[]>( apiUrl )
      .pipe(
        tap(_ => this.log( 'fetched Formations' ) ),
        catchError( this.handleError( 'getFormations', [] ) )
      );
  }

  private handleError<T>( operation = 'operation', result?: T ) {
    return ( error: any ): Observable<T> => {

      console.error(error); // log to console instead
      this.log( `${operation} failed: ${error.message}` );

      return of( result as T );
    };
  }

  private log(message: string) {
    console.log(message);
  }
}
