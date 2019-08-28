import { Component, OnInit } from '@angular/core';

// MODELS
import { Formations } from '../../../_models';
// COMPOSANTS
import { Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { Observable } from 'rxjs';
// SERVICES
import { FormationService } from 'src/app/_services/formations.service';
import { HttpService } from 'src/app/_services/http.service';
import { SearchService } from 'src/app/_services/search.service';
import { AuthService } from 'src/app/_services/auth.service';

@Component({
  selector: 'app-formations',
  templateUrl: 'formations.page.html',
  styleUrls: [ 'formations.page.scss' ]
})

export class FormationsPage implements OnInit {

  data: Formations[] = [];
  displayedColumns: string[] = [ 'title', 'reference' ];
  isLoadingResults = true;

  formations$: Observable<any>;
  // RECHERCHE
  items$: Observable<any>;

  constructor(
    private authService: AuthService,
    private formationService: FormationService,
    private router: Router,
    // tslint:disable-next-line: variable-name
    private _http: HttpService,
    // tslint:disable-next-line: variable-name
    private _itemsService: SearchService
  ) {}

  ngOnInit() {

    this.getPost();

    //  SEARCH
    this.items$ = this._itemsService.getItems();

    // NE FONCTIONNE PAS
    // this.getFormations();

    // console.log( 'logged --> ', this.authService.isLoggedIn );
  }

  // VOIR AVEC PROF ///////////////////////////////////////////
  // getFormations(): void {
  //   this.formationService.getFormations()
  //     .subscribe( formations => {
  //       this.data = formations;
  //       console.log( 'Lst Forms -->> ', this.data );
  //       // AFFICHAGE DU SPINNER DE CHARGEMENT
  //       this.isLoadingResults = false;
  //     }
  //     , err => {
  //       console.log( err );
  //       // AFFICHAGE DU SPINNER DE CHARGEMENT
  //       this.isLoadingResults = false;
  //     });
  // }

  getPost() {
    this.formations$ = this._http.get( 'http://localhost:8080/api/v1/mgm-formation' )
    .pipe(
      tap( data => console.log( data ) ),
      map( ( res: { formations: any[] } ) => res.formations ) // .filter(f => f.xxx > 23456) )
    );
    // AFFICHAGE DU SPINNER DE CHARGEMENT
    this.isLoadingResults = false;
  }


  search( $event ) {
    console.log( 'search key -->> ', $event.detail.value );
    this.items$ = this._itemsService.getItems().pipe(
      map( items => {
        return items.filter( i =>
          i.title.toLowerCase().includes( $event.detail.value.toLowerCase() ) ||
          i.reference.toLowerCase().includes( $event.detail.value.toLowerCase() ) ||
          i.description.toLowerCase().includes( $event.detail.value.toLowerCase() )
        );
      })
    );
  }
  // http://localhost:8080/api/v1/formation?q=

}
