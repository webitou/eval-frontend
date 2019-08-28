import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpService } from 'src/app/_services/http.service';

@Component({
  selector: 'app-evaluation-edit-page',
  templateUrl: './evaluation-edit-page.component.html',
  styleUrls: ['./evaluation-edit-page.component.scss']
})


export class EvaluationEditPageComponent implements OnInit {

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

  qtypes: any[] = [
    {
      id: 1,
      name: 'Instructeur',
      value: 'teacher',
    },
    {
      id: 2,
      name: 'Matériel',
      value: 'material'
    },
    {
      id: 3,
      name: 'Documentation',
      value: 'documentation',
    },
    {
      id: 4,
      name: 'Centre de formation',
      value: 'center',
    }
  ];

  public form: FormGroup;


  segmentChanged(ev: any) {
    console.log('Segment changed', ev.target.value);
    if ( ev.target.value === 'save' ) {
      this.submit();
    }
    if ( ev.target.value === 'del' ) {
      this.delForm();
    }
  }


  ngOnInit() {
    this.form = new FormGroup({
      question: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      ),
      qtype: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      ),
      _id: new FormControl(),
    });

    this.getform();
    console.log( 'current user -> ', this._http.user );
  }

  back() { this._location.back(); }

  getform() {

    const { id = null } = this._route.snapshot.params;

    if ( !id ) { this._router.navigateByUrl( 'evaluations' ); }

    this._http.get( 'http://localhost:8080/api/v1/eval/' + id )
      .pipe(
        tap( evalquest => console.log( 'evalquest ->> ', evalquest ) ),
        map( (res: { evalquest: any[] } ) => res.evalquest )
      ).toPromise().then( evalquest => {
        console.log( evalquest );
        this.form.patchValue( evalquest );
      });
  }


  async submit() {

    if ( !this.form.valid ) {
      console.log( 'Invalid form POST ->> ', this.form );
      return;
    }

    const {
      error = null, ...post
    } = await this._http.post( 'http://localhost:8080/api/v1/eval/' + this.form.value._id, this.form.value )
    .pipe(
      tap( data => console.log( 'data-> ', data ) )
    ).toPromise().then( ( res: any ) => res );
    if ( error ) {
      console.log( 'Error: ', error );
      return;
    }
    console.log( 'Success upd :', post );
    this._router.navigateByUrl( '/admin/evaluations' );
  }


  async delForm() {

    if ( !this.form.valid ) {
      console.log( 'Invalid form DEL ->> ', this.form );
      return;
    }

    const {
      error = null, ...post
    } = await this._http.delete( 'http://localhost:8080/api/v1/eval/' + this.form.value._id )
    .pipe(
      tap( data => console.log( 'data-> ', data ) )
    ).toPromise().then( ( res: any ) => res );
    if ( error ) {
      console.log( 'Error: ', error );
      return;
    }
    console.log( 'Success delete :', post );
    this._router.navigateByUrl( '/admin/evaluations' );

  }

}
// BACKEND
 // UPDATE EVAL  - POST/ http://localhost:8080/api/v1/eval/[FormId]
          // {
          //   "question": "",
          //   "type": "[]",
          // }


