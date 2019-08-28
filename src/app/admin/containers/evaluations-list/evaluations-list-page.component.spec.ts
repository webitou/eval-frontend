import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EvaluationsListPageComponent } from './evaluations-list-page.component';

describe('EvaluationListPage', () => {
  let component: EvaluationsListPageComponent;
  let fixture: ComponentFixture<EvaluationsListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationsListPageComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EvaluationsListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
