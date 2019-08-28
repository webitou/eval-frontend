import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/_services/http.service';

@Component({
  selector: 'app-formations-list-page',
  templateUrl: './formations-list-page.component.html',
  styleUrls: ['./formations-list-page.component.scss']
})

export class FormationsListPageComponent implements OnInit {

  formations$: Observable<any>;
  id: string;

  constructor(
    // tslint:disable-next-line: variable-name
    private _http: HttpService,
    // tslint:disable-next-line: variable-name
    private _router: Router
  ) {}

  ngOnInit() {
    this.getPost();
    console.log( 'current user -> ', this._http.user);
  }

  getPost() {
    this.formations$ = this._http.get( 'http://localhost:8080/api/v1/mgm-formation/' )
    .pipe(
      tap( data => console.log( 'getPost ->> ', data ) ),
      map( (res: { formations: any[] } ) => res.formations )
    );
  }

  delForm( id ) {
    // DELETE FORM  - DELETE/ http://localhost:8080/api/v1/mgm-formation/[FormId]

      const url = `http://localhost:8080/api/v1/mgm-formation/${id}`;
      return this._http.delete(url).pipe(
        tap( data => console.log( data ) ),
      map( ( res: { formations: any[] } ) => res.formations ));
      console.log( 'Success delete');

  }


}
// BACKEND
// VIEW EVALS   - GET/ http://localhost:8080/api/v1/mgm-formation/
