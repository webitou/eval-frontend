import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { RatingFormationPage } from './rating-formation.page';

describe( 'RatingFormationPage', () => {
  let component: RatingFormationPage;
  let fixture: ComponentFixture<RatingFormationPage>;

  beforeEach( async( () => {
    TestBed.configureTestingModule( {
      declarations: [ RatingFormationPage ],
      imports: [ IonicModule.forRoot() ]
    } ).compileComponents();

    fixture = TestBed.createComponent( RatingFormationPage );
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect( component ).toBeTruthy();
  });
});
