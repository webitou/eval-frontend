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


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {

  @Input() title: string;
  @Input() backBtn: false;

  // AFFICHAGE DU BOUTON ET DU CHAMPS RECHERCHE
  searchBtn = false;
  dspSearchBtn = false;

  // AFFICHAGE DU BOUTON ADMIN TOP
  showBtnMainAdmin$: Observable<boolean> = of(false);

  userId$: Observable<any>;

  // AFFICHAGE DES BOUTONS UTILISATEUR
  logged$: Observable<boolean> = this._auth.isLoggedIn$;

  constructor(
// FOR BACK BUTTON
    // tslint:disable-next-line: variable-name
    private _location: Location,
// FOR SEARCH BUTTON
    // tslint:disable-next-line: variable-name
    private _router: Router,
// SERVICE UTILISATEUR
    // tslint:disable-next-line: variable-name
    private _auth: AuthService,
//  NOTIFICATIONS
    private toastController: ToastController
  ) { }


  ngOnInit() {

// CONTROLE USER ACCESS
    this.showBtnMainAdmin$ =  this._auth.currentUser.pipe(
      map( res => {
        if ( !res ) { return false; }
        // console.log('Admin show btn -->> ', res.admin);
        // console.log( 'currentUser ', res );
        return res.admin;
      })
    );

// RECUPERE ID DE L'UTILISATEUR
    this.userId$ =  this._auth.currentUser.pipe(
      map( res => {
        if ( !res ) { return false; }
        // console.log('UserId -->> ', res.userId);
        // console.log( 'currentUser ', res );
        return res.userId;
      })
    );

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

// REDIRECTION PAGE PROFIL UTILISATEUR
  navTo( userId ) {
    // console.log( userId );
    this._router.navigateByUrl( 'tabs/user/' + userId );
  }

// RETOUR ARRIERE SUR NAVIGATION
  back() {
    // console.log( 'Back header -->> ' );
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

// AFFICHAGE DU BOUTON RECHERCHE
  getSearch() {
    this.searchBtn = true;
  }

}
