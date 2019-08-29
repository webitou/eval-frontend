import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Location } from '@angular/common';
import { Router, ActivatedRoute } from '@angular/router';

import { tap, map } from 'rxjs/operators';
import { HttpService } from 'src/app/_services/http.service';
import { TypeOfQuestion } from 'src/app/_core/constants/constants';
import { Observable } from 'rxjs';

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

  qtypes = TypeOfQuestion;

  public form: FormGroup;

  evalQuestion$: Observable<any>;
  evalQuestion: any;

  segmentChanged(ev: any) {
    console.log('Segment changed', ev.target.value);
    if ( ev.target.value === 'save' ) {
      this.submit();
    }
    if ( ev.target.value === 'del' ) {
      this.delEval();
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
      qtypes: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      ),
      _id: new FormControl(),
    });

    this.getform();
    // console.log( 'current user Eval page -> ', this._http.user );
  }

  back() { this._location.back(); }

  getform() {
    const { id = null } = this._route.snapshot.params;

    if ( !id ) { this._router.navigateByUrl( 'evaluations' ); }

    // return this._http.get( 'http://localhost:8080/api/v1/eval/' + id )
    //   .pipe(
    //     tap( data => console.log( 'Data evalQuestion -->> ', data ) ),
    //     map( ( res: { evalQuestion: any[] } ) => res.evalQuestion )
    //   ).toPromise().then( evalQuestion => {
    //     console.log( 'evalQuestion -->> ', evalQuestion );
    //     this.form.patchValue( evalQuestion );
    //   });

    this._http.get( 'http://localhost:8080/api/v1/eval/' + id )
    .subscribe( ( res: any[] ) => {
      console.log( 'Eval -->> ', res);
      this.evalQuestion = res;
      console.log( 'evalQuestion -->> ', this.evalQuestion );
      this.form.patchValue( this.evalQuestion );
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


  async delEval() {
    const { id = null } = this._route.snapshot.params;

    if ( !id ) { this._router.navigateByUrl( 'evaluations' ); }
    // if ( !this.form.valid ) {
    //   console.log( 'Invalid form DEL ->> ', this.form );
    //   return;
    // }
    const {
      error = null, ...post
    // } = await this._http.delete( 'http://localhost:8080/api/v1/eval/' + this.form.value._id )
    } = await this._http.delete( 'http://localhost:8080/api/v1/eval/' + id )
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
