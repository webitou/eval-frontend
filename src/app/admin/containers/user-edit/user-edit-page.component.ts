import { Component, OnInit } from '@angular/core';

import { Location } from '@angular/common';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { HttpService } from 'src/app/_services/http.service';

@Component({
  selector: 'app-user-edit-page',
  templateUrl: './user-edit-page.component.html',
  styleUrls: ['./user-edit-page.component.scss']
})
export class UserEditPageComponent implements OnInit {

  public form: FormGroup;
  public user$: Observable<any>;

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

  segmentChanged( ev: any ) {
    console.log( 'Segment changed', ev.target.value );
    if ( ev.target.value === 'save' ) {
      this.submit();
    }
    if ( ev.target.value === 'del' ) {
      this.delUser();
    }
  }

  ngOnInit() {
    this.form = new FormGroup( {
      fullname: new FormControl(
        '',
        Validators.compose( [
          Validators.required,
          Validators.minLength( 2 )
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose( [
          Validators.required,
          Validators.minLength( 5 )
        ])
      ),
      // password: new FormControl(
      //   '',
      //   Validators.compose([
      //     Validators.required,
      //     Validators.minLength(5)
      //   ])
      // ),
      admin: new FormControl(
        '',
        Validators.compose( [ ] )
      ),
      _id: new FormControl(),
      course: new FormControl( { } ),

    });
    this.getuser();
    this.getForm();

    // console.log( 'current user -> ', this._http.user );
  }

  back() { this._location.back(); }

  getuser() {
    const { id = null } = this._route.snapshot.params;

    if ( !id ) { this._router.navigateByUrl( 'users' ); }

    this._http.get( 'http://localhost:8080/api/v1/users/' + id )
      .pipe(
        // tap( data => console.log( data ) ),
        map( ( res: { user: any[] } ) => res.user )
      ).toPromise().then( user => {
        console.log( 'getUser -->> ', user );
        this.form.patchValue( user );
      });
  }

  getForm() {
    const { id = null } = this._route.snapshot.params;

    if ( !id ) { this._router.navigateByUrl( 'formations' ); }

    this.user$ = this._http.get( 'http://localhost:8080/api/v1/users/' + id )
      .pipe(
        tap( data => console.log( data ) ),
        map( ( res: { user: any[] } ) => res.user )
      );
   }

  async submit() {
    if ( !this.form.valid ) {
      console.log( this.form );
      return;
    }
    const {
      error = null, ...post
    } = await this._http.post( 'http://localhost:8080/api/v1/users/' + this.form.value._id, this.form.value )
    .pipe(
      tap( data => console.log( 'data-> ', data ) )
    ).toPromise().then( ( res: any ) => res );
    if ( error ) {
      console.log( 'Error: ', error );
      return;
    }
    console.log( 'Success :', post );
    this._router.navigateByUrl( '/admin/users' );
  }

  async delUser() {
    const {
      error = null, ...post
    } = await this._http.delete( 'http://localhost:8080/api/v1/users/' + this.form.value._id )
    .pipe(
      tap( data => console.log( 'data Delete -->> ', data ) )
    ).toPromise().then( ( res: any ) => res );
    if ( error ) {
      console.log( 'Error: ', error );
      return;
    }
    console.log( 'Success delete :', post );
    this._router.navigateByUrl( '/admin/users' );

  }

}
// BACKEND
// VIEW EVALS   - GET/ http://localhost:8080/api/v1/users/
