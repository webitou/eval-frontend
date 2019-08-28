import { Component, OnInit, Input } from '@angular/core';
import { Location } from '@angular/common';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { ToastController } from '@ionic/angular';
// SERVICES
import { AuthService } from 'src/app/_services/auth.service';
import { SearchService } from 'src/app/_services/search.service';
// COMPONENTS
import { map, tap } from 'rxjs/operators';
import { Observable, of } from 'rxjs';
import { IUser } from 'src/app/_models';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Input() backBtn: false;
  @Input() showBtnAdmin: false;

  // AFFICHAGE DU BOUTON ET DU CHAMPS RECHERCHE
  searchBtn = false;
  dspSearchBtn = false;

  // AFFICHAGE DES BOUTONS UTILISATEUR
  logged$: Observable<boolean> = this._auth.isLoggedIn$;

  public user$: Observable<IUser>;

  constructor(
    // tslint:disable-next-line: variable-name
    private _location: Location,
    // tslint:disable-next-line: variable-name
    private _route: ActivatedRoute,
    // tslint:disable-next-line: variable-name
    private _router: Router,
    // SERVICE UTILISATEUR
    // tslint:disable-next-line: variable-name
    private _auth: AuthService,
    //  NOTIFICATIONS
    private toastController: ToastController
  ) { }

  ngOnInit() {
// this._auth.isLoggedIn$


    const userAdmin = this._auth.isLogged();
    console.log( 'User --> ', userAdmin );

// AFFICHAGE DU BOUTON DE RECHERCHE
    const routeUrlactive = this._router.url;
    if ( routeUrlactive === '/tabs/formations' ) {
      this.dspSearchBtn = true;
    }

  }

// DECONNEXION AVEC AUTH.SERVICE
  logout() {
    this._auth.logout();
    this.showSuccessLogout();
  }

// RETOUR ARRIERE SUR NAVIGATION
  back() {
    console.log( 'Back header -->> ' );
    this._location.back();
  }

// MESSAGE DE CONFIRMATION DE DECONNEXION
  async showSuccessLogout() {
    const toast = await this.toastController.create({
      message: 'Voue êtes déconnecté...',
      color: 'success',
      duration: 2000,
      position: 'middle',
    });
    toast.present();
  }

  getProfil() {

  }

// AFFICHAGE DU BOUTON RECHERCHE
  getSearch() {
    this.searchBtn = true;
  }

}
