import { Component, OnInit } from '@angular/core';

import { AuthService } from 'src/app/_services/auth.service';
import { HttpService } from 'src/app/_services/http.service';

import { Router, Data } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { NavController } from '@ionic/angular';

// PAGINATION
// import { PagerService } from 'src/app/_services/pager.service';


@Component({
  selector: 'app-rating-formation',
  templateUrl: 'rating-formation.page.html',
  styleUrls: [ 'rating-formation.page.scss' ]
})

export class RatingFormationPage implements OnInit {

  // AFFICHAGE DU SPINNER DE CHARGEMENT
  isLoadingResults = true;

  slides: any;
  evals$: Observable<any>;

  constructor(
    private authService: AuthService,
    private router: Router,
    // tslint:disable-next-line: variable-name
    private _http: HttpService,
    // SERVICE POUR LA PAGINATION
    // private pagerService: PagerService
  ) {}

  // PAGINATION
  // array of all items to be paged
  private allItems: any[];
  // pager object
  pager: any = {};
  // paged items
  pagedItems: any[];


  ngOnInit() {

    // get dummy data
    // this._http.get('http://localhost:8080/api/v1/eval/')
    // .map((response: Response) => response.json())
    // .subscribe(data => {
    //     // set items to json response
    //     this.allItems = data;

    //     // initialize to page 1
    //     this.setPage(1);
    // });



    this.getPost();
    // console.log( 'logged --> ', this.authService.isLoggedIn );
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


  logout() {
    localStorage.removeItem( 'authToken' );
    this.router.navigate( [ 'tabs/signin' ] );
  }

}

