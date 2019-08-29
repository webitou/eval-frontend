import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { tap, map } from 'rxjs/operators';
import { HttpService } from 'src/app/_services/http.service';
import { daysOfWeek } from '../../../_core/constants/constants';

@Component({
  selector: 'app-formation-edit-page',
  templateUrl: './formation-edit-page.component.html',
  styleUrls: ['./formation-edit-page.component.scss']
})

export class FormationEditPageComponent implements OnInit {
  constructor(
    // tslint:disable-next-line: variable-name
    private _http: HttpService,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    private _router: Router,
    // tslint:disable-next-line: variable-name
    private _location: Location
  ) {}

// AFFICHAGE DE LA LISTE DES JOURS DE LA SEMAINE
  dally = daysOfWeek;

  public form: FormGroup;

  // tslint:disable-next-line: variable-name
  account_validation_messages = {
    title: [
      { type: 'required', message: 'Un titre de formation est requis !' },
      { type: 'minlength', message: 'Le titre doit avoir minimum 5 caractères !' },
    ],
    reference: [
      { type: 'required', message: 'La formation doit avoir une référence !' },
      { type: 'minlength', message: 'Le titre doit avoir minimum 5 caractères !' },
    ],
    dateStart: [
      { type: 'required', message: 'La date de départ est requis !' },
    ],
    dateEnd: [
      { type: 'required', message: 'Une date de fin est requis !' },
    ],
    dayWeek: [
      { type: 'required', message: 'Le/Les jour/s de formation est/sont requis !' },
    ],
    timeStart: [
      { type: 'required', message: 'L\'heure de départ est requis !' },
    ],
    timeEnd: [
      { type: 'required', message: 'L\'heure de fin est requis !' },
    ],
    teacher: [
      { type: 'required', message: 'Un formateur est requis !' },
    ],
    description: [
      { type: 'required', message: 'Une description est nécésaire !' },
    ]
  };

  segmentChanged( ev: any ) {
    console.log( 'Segment changed', ev.target.value );
    if ( ev.target.value === 'save' ) {
      this.submit();
    }
    if ( ev.target.value === 'del' ) {
      this.delForm();
    }
  }

  ngOnInit() {
    this.form = new FormGroup( {
      title: new FormControl(
        'Adobe Photoshop',
        Validators.compose( [
          Validators.required,
          Validators.minLength( 5 )
        ] )
      ),
      reference: new FormControl(
        'ECM_',
        Validators.compose( [
          Validators.required,
          Validators.minLength( 5 )
        ] )
      ), // reference formation",
      dateStart: new FormControl(
        '',
        Validators.compose( [
          Validators.required
        ] )
      ), // "2019-08-04",
      dateEnd: new FormControl(
        '',
        Validators.compose( [
          Validators.required
        ] )
      ), // "2019-08-28",
      dayWeek: new FormControl(
        '',
        Validators.compose( [
          Validators.required
        ] )
      ),
      _id: new FormControl(),
      timeStart: new FormControl(
        '',
        Validators.compose( [
          Validators.required
        ] )
      ),
      timeEnd: new FormControl(
        '',
        Validators.compose( [
          Validators.required
        ] )
      ),
      teacher: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ),
      description: new FormControl(
        '',
        Validators.compose( [
          Validators.required
        ] )
      ),
      objectif: new FormControl(
        '',
      ),
      content: new FormControl(
        '',
      ),
      prerequisites: new FormControl(
        '',
      ),
    } );

    this.getform();
    // console.log( 'current user Edit Form -> ', this._http.user );
  }

  back() { this._location.back(); }

  getform() {
    const { id = null } = this._route.snapshot.params;

    if ( !id ) { this._router.navigateByUrl( 'formations' ); }

    this._http.get( 'http://localhost:8080/api/v1/mgm-formation/' + id )
      .pipe(
        // tap( data => console.log( data ) ),
        map( (res: { formation: any[] } ) => res.formation )
      ).toPromise().then( formation => {
        // console.log( formation );
        this.form.patchValue( formation );
      });
  }

  async submit() {

    if ( !this.form.valid ) {
      console.log( 'Invalid form (Required) ->> ', this.form );

      return;
    }

    const {
      error = null, ...post
    } = await this._http.post( 'http://localhost:8080/api/v1/mgm-formation/' + this.form.value._id, this.form.value )
    .pipe(
      tap( data => console.log( 'data-> ', data ) )
    ).toPromise().then( ( res: any ) => res );
    if ( error ) {
      console.log( 'Error: ', error );
      return;
    }
    console.log( 'Success upd :', post );
    this._router.navigateByUrl( '/admin/formations' );
  }


  async delForm() {

    const {
      error = null, ...post
    } = await this._http.delete( 'http://localhost:8080/api/v1/mgm-formation/' + this.form.value._id )
    .pipe(
      tap( data => console.log( 'data-> ', data ) )
    ).toPromise().then( ( res: any ) => res );
    if ( error ) {
      console.log( 'Error: ', error );
      return;
    }
    console.log( 'Success delete :', post );
    this._router.navigateByUrl( '/admin/formations' );
  }
}
