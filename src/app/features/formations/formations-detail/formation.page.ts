import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/_services/auth.service';

import { Formations } from './formation';
import { FormationService } from 'src/app/_services/formations.service';
import { Router, ActivatedRoute } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { HttpService } from 'src/app/_services/http.service';


@Component({
  selector: 'app-formation',
  templateUrl: 'formation.page.html',
  styleUrls: [ 'formation.page.scss' ]
})
export class FormationPage implements OnInit {

  data: Formations[] = [];
  displayedColumns: string[] = [ 'title', 'reference' ];
  isLoadingResults = true;


  formation$: Observable<any>;

  constructor(
    private authService: AuthService,
    private formationService: FormationService,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    private _router: Router,
    // tslint:disable-next-line: variable-name
    private _http: HttpService
  ) {}

  ngOnInit() {

    // RECUPERATION DE ID
    const { id = null } = this._route.snapshot.params;
    // SI PAS ID RETOUR SUR LA LISTE
    if ( !id ) { this._router.navigateByUrl( 'formations' ); }

    this.formation$ = this._http.get( 'http://localhost:8080/api/v1/mgm-formation/' + id )
    .pipe(
      tap( data => console.log( data ) ),
      map( ( res: { formation: any[] } ) => res.formation ) // .filter(f => f.xxx > 23456) )
    );
    // AFFICHAGE DU SPINNER DE CHARGEMENT
    this.isLoadingResults = false;

    // console.log( 'logged --> ', this.authService.isLoggedIn );
  }

}
