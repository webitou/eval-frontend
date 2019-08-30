import { Component, OnInit } from '@angular/core';

// MODELS
import { Formations } from '../../../_models';
// COMPOSANTS
import { Router } from '@angular/router';
import { tap, map } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
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

  showBtnAdmin$: Observable<boolean> = of( false );

  formations$: Observable<any>;
// RECHERCHE
  items$: Observable<any>;

  constructor(
    // tslint:disable-next-line: variable-name
    private _auth: AuthService,
    private formationService: FormationService,
    private router: Router,
    // tslint:disable-next-line: variable-name
    private _http: HttpService,
    // tslint:disable-next-line: variable-name
    private _itemsService: SearchService
  ) {}

  ngOnInit() {

    this.getPost();

// SEARCH
    this.items$ = this._itemsService.getItems();

    // NE FONCTIONNE PAS
    // this.getFormations();


// CONTROLE USER ACCESS
    this.showBtnAdmin$ =  this._auth.currentUser.pipe(
      map( res => {
        if ( !res ) { return false; }
        // console.log('Show BtnAdmin Formation detail -->> ', res.admin);
        // console.log('Show res -->> ', res);
        return res.admin;
      })
    );
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
      map( ( res: { formations: any[] } ) => res.formations ) // .filter(f => f.date _start> date.now()) )
    );
// AFFICHAGE DU SPINNER DE CHARGEMENT
    this.isLoadingResults = false;
  }

// FONCTION SEARCH N'EST PAS ENCORE EN FONCTION
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
  // BACKEND
  // http://localhost:8080/api/v1/formation?q=

}
