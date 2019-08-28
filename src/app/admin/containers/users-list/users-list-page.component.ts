import { Component, OnInit } from '@angular/core';

import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';

import { HttpService } from 'src/app/_services/http.service';

@Component({
  selector: 'app-users-list-page',
  templateUrl: './users-list-page.component.html',
  styleUrls: ['./users-list-page.component.scss']
})
export class UsersListPageComponent implements OnInit {

  users$: Observable<any>;

  constructor(
    // tslint:disable-next-line: variable-name
    private _http: HttpService
  ) {}

  ngOnInit() {
    this.getPost();
  }

  getPost() {
    this.users$ = this._http.get( 'http://localhost:8080/api/v1/users/' )
    .pipe(
      tap( data => console.log( data ) ),
      map( (res: { users: any[] } ) => res.users )
    );
  }

}
// BACKEND
// VIEW EVALS   - GET/ http://localhost:8080/api/v1/users/
