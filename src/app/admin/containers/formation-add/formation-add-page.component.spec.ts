import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormationAddPageComponent } from './formation-add-page.component';

describe('FormationAddPage', () => {
  let component: FormationAddPageComponent;
  let fixture: ComponentFixture<FormationAddPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormationAddPageComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormationAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
