import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpService } from 'src/app/_services/http.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-user-page',
  templateUrl: './user-page.component.html',
  styleUrls: ['./user-page.component.scss']
})
export class UserPageComponent implements OnInit {

  user$: Observable<any>;
  userConnect$: Observable<any>;

  constructor(
    // tslint:disable-next-line: variable-name
    private _http: HttpService,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    private _router: Router,
// SERVICE UTILISATEUR
    // tslint:disable-next-line: variable-name
    private _auth: AuthService,
  ) {}


  ngOnInit() {

    const { id = null } = this._route.snapshot.params;

    if ( !id ) { this._router.navigateByUrl( 'formations' ); }

    this.user$ = this._http.get( 'http://localhost:8080/api/v1/users/' + id )
      .pipe(
        tap( data => console.log( data ) ),
        map( ( res: { user: any[] } ) => res.user )
      );

// RECUPERE LA DATE DE CONNEXION DE L'UTILISATEUR
    this.userConnect$ =  this._auth.currentUser.pipe(
      map( res => {
        if ( !res ) { return false; }
        console.log('User Connect -->> ', res.lastLogin);
        // console.log( 'currentUser ', res );
        console.log( 'Date ', res.lastLogin );
        return res.lastLogin;
      })
    );
  }
}
