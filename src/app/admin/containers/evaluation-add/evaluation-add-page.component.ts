import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { tap } from 'rxjs/operators';
import { Router } from '@angular/router';
import { HttpService } from 'src/app/_services/http.service';

@Component({
  selector: 'app-evaluation-add-page',
  templateUrl: './evaluation-add-page.component.html',
  styleUrls: ['./evaluation-add-page.component.scss']
})
export class EvaluationAddPageComponent implements OnInit {

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

  constructor(
    // tslint:disable-next-line: variable-name
    private _http: HttpService,
    // tslint:disable-next-line: variable-name
    private _router: Router
  ) {}

  ngOnInit() {
    this.form = new FormGroup({
      question: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(5)
        ])
      ), // QUESTION
      type: new FormControl(
        '',
        Validators.compose([
          Validators.required,
          Validators.minLength(1)
        ])
      ), // QUESTION TYPE [material], [teacher], [documentation], [center]

    });
  }

  async submit() {
    if ( !this.form.valid ) {
      console.log( this.form );
      return;
    }
    const {
      error = null, ...post
    } = await this._http.post( 'http://localhost:8080/api/v1/eval/', this.form.value )
    .pipe(
      tap( data => console.log( 'data-> ', data ) )
    ).toPromise().then( ( res: any ) => res );
    if ( error ) {
      console.log( 'Error: ', error );
      return;
    }
    console.log( 'Success :', post );
    this._router.navigateByUrl( '/admin/evaluations' );
  }
}

// ADD EVAL     - POST/ http://localhost:8080/api/v1/eval/
          // {
          //   "question": "Question d'évaluation",
          //   "type": "[material], [teacher], [documentation], [center]"
          // }
