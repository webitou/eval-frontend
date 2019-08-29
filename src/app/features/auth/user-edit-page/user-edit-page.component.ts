import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { tap, map } from 'rxjs/operators';
import { ActivatedRoute, Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { HttpService } from 'src/app/_services/http.service';


@Component({
  selector: 'app-user-edit-page',
  templateUrl: './user-edit-page.component.html',
  styleUrls: ['./user-edit-page.component.scss']
})
export class UserEditPageComponent implements OnInit {

  user$: Observable<any>;
  public form: FormGroup;

  constructor(
    // tslint:disable-next-line: variable-name
    private _http: HttpService,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    private _router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      fullname: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(2)
        ])
      ),
      email: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      ),
      _id: new FormControl(),

    });
    this.getuser();
    console.log( 'current user -> ', this._http.user);
  }

  getuser() {
    // const { id = null } = this._route.snapshot.params;
    const { id = null } = this._http.user._id;
    // console.log( 'id User ->> ', id );

    if ( !id ) { this._router.navigateByUrl( 'formations' ); }

    this._http.get( 'http://localhost:8080/api/v1/users/' + id )
      .pipe(
        // tap( data => console.log( data ) ),
        map( ( res: { user: any[] } ) => res.user )
      ).toPromise().then( user => {
        console.log( user );
        this.form.patchValue( user );
      });
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
    this._router.navigateByUrl( '/user/' + this.form.value._id );
  }

}
