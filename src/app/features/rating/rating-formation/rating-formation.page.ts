import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';

import { Router, Data } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';
import { FormGroup, FormControl, FormArray } from '@angular/forms';
import { StarRaterComponent } from 'src/app/shared/components/star-rater/star-rater.component';

@Component({
  selector: 'app-rating-formation',
  templateUrl: 'rating-formation.page.html',
  styleUrls: [ 'rating-formation.page.scss' ]
})

export class RatingFormationPage implements OnInit {

  // AFFICHAGE DU SPINNER DE CHARGEMENT
  isLoadingResults = true;

  evals$: Observable<any>;

  // NAVIGATION DES QUESTIONS
  sliceFrom = 0;
  sliceTo = 1;

  form: FormGroup;

  constructor(
    private authService: AuthService,
    private router: Router,
    // tslint:disable-next-line: variable-name
    private _http: HttpService,
  ) {}


  ngOnInit() {
    // STOKAGE DES VALEURS DU RATTING
    this.form = new FormGroup({
      ratting: new FormArray([])
    });

    // RECUPERATION DES QUESTIONS D'EVALUATION
    this.getPost();
  }

  add( i, starRater: StarRaterComponent ) {
    // add to form new value
    ( this.form.get( 'ratting' ) as FormArray ).push(
      new FormGroup( {
        q_index: new FormControl( this.sliceFrom + 1 ),
        r_value: new FormControl( starRater._value )
      } )
    );
    // update value DOM for nex quuestion
    this.sliceFrom = ++this.sliceFrom ;
    this.sliceTo = ++this.sliceTo ;
    console.log( this.form.value );
  }

  remove( i, starRater: StarRaterComponent ) {
    this.sliceFrom = --this.sliceFrom ;
    this.sliceTo = --this.sliceTo ;
    console.log( 'Value remove -->> ', i );
    console.log( 'Form -->> ', this.form );

    ( this.form.get( 'ratting' ) as FormArray ).push(
      new FormGroup( {
        q_index: new FormControl( i ),
        r_value: new FormControl( starRater._value )
      } )
    );
  }

  getPost() {
    // AFFICHAGE DU SPINNER DE CHARGEMENT
    this.isLoadingResults = false;

    this.evals$ = this._http.get( 'http://localhost:8080/api/v1/eval/' )
    .pipe(
      tap( data => console.log( data ) ),
      map( (res: { evals: any[] } ) => res.evals )
    );
  }

}

