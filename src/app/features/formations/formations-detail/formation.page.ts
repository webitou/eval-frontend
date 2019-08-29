import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup, FormArray } from '@angular/forms';

// SERVICES
import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';

// MODELS
import { Formations } from './formation';

import { tap, map, catchError } from 'rxjs/operators';
import { Observable, of, BehaviorSubject } from 'rxjs';


@Component({
  selector: 'app-formation',
  templateUrl: 'formation.page.html',
  styleUrls: [ 'formation.page.scss' ]
})
export class FormationPage implements OnInit {

  data: Formations[] = [];
  displayedColumns: string[] = [ 'title', 'reference' ];
  isLoadingResults = true;

  id: string;
  uID: string;

  formation: any;

  // tslint:disable-next-line: variable-name
  private _isLoggedIn: BehaviorSubject<boolean> = new BehaviorSubject(false);
  isLoggedIn$: Observable<boolean> = this._isLoggedIn.asObservable();

  showBtnAdmin$: Observable<boolean> = of( false );
  formation$: Observable<any>;

// AFFICHAGE DES BOUTONS UTILISATEUR
  logged$: Observable<boolean> = this._auth.isLoggedIn$;

  userId$: Observable<any>;
  form: FormGroup;

  constructor(
// SERVICE UTILISATEUR
    // tslint:disable-next-line: variable-name
    private _auth: AuthService,
// SERVICE ROUTE
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
      tap( data => console.log( 'List form -->> ', data ) ),
      map( ( res: { formation: any[] } ) => res.formation )
    );

// AFFICHAGE DU SPINNER DE CHARGEMENT
    this.isLoadingResults = false;

// CONTROLE USER ACCESS
    this.showBtnAdmin$ =  this._auth.currentUser.pipe(
      map( res => {
        if ( !res ) { return false; }
        // console.log('Show BtnAdmin Formation detail -->> ', res.admin);
        // console.log('Show res -->> ', res);
        return res.admin;
      })
    );
  }

  pushInscription() {
    this.form = new FormGroup({
      formation: new FormArray([])
    });

// RECUPERATION DE ID
    const { id = null } = this._route.snapshot.params;
// SI PAS ID RETOUR SUR LA LISTE
    if ( !id ) { this._router.navigateByUrl( 'formations' ); }

    this.formation$ = this._http.get( 'http://localhost:8080/api/v1/mgm-formation/' + id )
     .pipe(
       tap( data => console.log( 'List form send -->> ', data ) ),
       map( ( res: { formation: any[] } ) => res.formation ),
       tap( formation => this.form.patchValue( {
        _id: formation._id,
        title: formation.title,
        reference: formation.reference
       } ) )
     );

// UserID
    this.uID = this._auth.currentUserValue.userId;
    console.log( 'user = ', this._auth.currentUserValue.userId );


// INFORMATION FORMATION
    console.log( 'formation = ', this.form.value );
    // const data = {
    //       _id: '5d42fedc56423339a1241f35',
    //       title: 'Adobe PHOTOSHOP',
    //       reference: 'ECM_563982',
    //       dateStart: '2019-08-23T00:00:00.000Z',
    //       dateEnd: '2019-09-12T00:00:00.000Z',
    //       dayWeek: 4,
    //       timeStart: '2019-08-22T14:45:23.740+02:00',
    //       timeEnd: '2019-08-22T20:30:23.740+02:00'
    // };



    // this._http.post( 'http://localhost:8080/api/v1/users/' + this.uID + '/formations', this.form )
    //     .pipe(
    //       map( formation => {
    //         console.log( 'Formation send -->> ', formation );
    //         return formation;
    //       }),
    //       tap( _ => this._isLoggedIn.next(true) ),
    //     ).toPromise().then(res => {
    //       console.log('inscription ok', res);
    //     })
    //     .catch(err => {
    //       console.log('err inscription', err);
    //     });
  }
}
