import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormationsPage } from './formations.page';

describe('FormationsPage', () => {
  let component: FormationsPage;
  let fixture: ComponentFixture<FormationsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormationsPage],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormationsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
