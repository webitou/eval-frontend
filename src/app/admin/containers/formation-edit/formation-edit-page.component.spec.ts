import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormationEditPageComponent } from './formation-edit-page.component';

describe('FormationEditPage', () => {
  let component: FormationEditPageComponent;
  let fixture: ComponentFixture<FormationEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormationEditPageComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormationEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
