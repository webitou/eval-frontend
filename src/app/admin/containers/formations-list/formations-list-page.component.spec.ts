import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { FormationsListPageComponent } from './formations-list-page.component';

describe('FormationsListPage', () => {
  let component: FormationsListPageComponent;
  let fixture: ComponentFixture<FormationsListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [FormationsListPageComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(FormationsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
