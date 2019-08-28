import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/_services/http.service';
import { daysOfWeek } from 'src/app/_core/constants/constants';

@Component({
  selector: 'app-formations-add-page',
  templateUrl: './formation-add-page.component.html',
  styleUrls: ['./formation-add-page.component.scss']
})


export class FormationAddPageComponent implements OnInit {

  dally = daysOfWeek;

  public form: FormGroup;

  constructor(
    // tslint:disable-next-line: variable-name
    private _http: HttpService,
    // tslint:disable-next-line: variable-name
    private _router: Router
  ) {}

  // tslint:disable-next-line: variable-name
  account_validation_messages = {
    'title': [
      { type: 'required', message: 'Un titre de formation est requis !' },
      { type: 'minlength', message: 'Le titre doit avoir minimum 5 caractères !' },
    ],
    'reference': [
      { type: 'required', message: 'La formation doit avoir une référence !' },
      { type: 'minlength', message: 'Le titre doit avoir minimum 5 caractères !' },
    ],
    'dateStart': [
      { type: 'required', message: 'La date de départ est requis !' },
    ],
    'dateEnd': [
      { type: 'required', message: 'Une date de fin est requis !' },
    ],
    'dayWeek': [
      { type: 'required', message: 'Le/Les jour/s de formation est/sont requis !' },
    ],
    'timeStart': [
      { type: 'required', message: 'L\'heure de départ est requis !' },
    ],
    'timeEnd': [
      { type: 'required', message: 'L\'heure de fin est requis !' },
    ],
    'teacher': [
      { type: 'required', message: 'Un formateur est requis !' },
    ],
    'description': [
      { type: 'required', message: 'Une description est nécésaire !' },
    ]
  };

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.target.value);
    if ( ev.target.value === 'save' ) {
      this.submit();
    }
  }

  ngOnInit() {
    this.form = new FormGroup( {
      title: new FormControl(
        'Adobe Photoshop',
        Validators.compose([
          Validators.required,
          Validators.minLength(1)
        ])
      ),
      reference: new FormControl(
        'ECM_',
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      ), // reference formation",
      dateStart: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ), // "2019-08-04",
      dateEnd: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ), // "2019-08-28",
      dayWeek: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ),
      timeStart: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ),
      timeEnd: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ),
      teacher: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
      ),
      description: new FormControl(
        '',
        Validators.compose([
          Validators.required
        ])
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
    });
    console.log( 'current user -> ', this._http.user);
  }

  back() {
    this._router.navigateByUrl( '/admin/formations' );
  }

  async submit() {
    if ( !this.form.valid ) {
      console.log( this.form );
      return;
    }
    const {
      error = null, ...post
    } = await this._http.post( 'http://localhost:8080/api/v1/mgm-formation/', this.form.value )
    .pipe(
      tap( data => console.log( 'data-> ', data ) )
    ).toPromise().then( ( res: any ) => res );
    if ( error ) {
      console.log( 'Error: ', error );
      return;
    }
    console.log( 'Success :', post );
    this._router.navigateByUrl( '/tabs/formations' );
  }
}
// BACKEND
// ADD FORM     - POST/ http://localhost:8080/api/v1/mgm-formation/
          // {
          //   "title": "formation title",
          //   "reference": "reference formation",
          //   "dateStart": "2019-08-04",
          //   "dateEnd": "2019-08-28",
          //   "dayWeek": 2
          // }


