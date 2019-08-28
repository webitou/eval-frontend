import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { HttpService } from 'src/app/_services/http.service';

@Component({
  selector: 'app-evaluations-list-page',
  templateUrl: './evaluations-list-page.component.html',
  styleUrls: ['./evaluations-list-page.component.scss']
})
export class EvaluationsListPageComponent implements OnInit {

  evals$: Observable<any>;

  constructor(
    // tslint:disable-next-line: variable-name
    private _http: HttpService
  ) {}

  ngOnInit() {
    this.getPost();
    console.log( 'current user -> ', this._http.user);
  }

  getPost() {
    this.evals$ = this._http.get( 'http://localhost:8080/api/v1/eval/' )
    .pipe(
      tap( data => console.log( data ) ),
      map( (res: { evals: any[] } ) => res.evals )
    );
  }


  async delValue( id ) {

    const url = `http://localhost:8080/api/v1/eval/${id}`;
    return this._http.delete( url ).pipe(
        tap( data => console.log( data ) ),
      map( ( res: { formations: any[] } ) => res.formations ));
    console.log( 'Success delete');

  }

}
// BACKEND
// VIEW EVALS   - GET/ http://localhost:8080/api/v1/eval/
