import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EvaluationEditPageComponent } from './evaluation-edit-page.component';

describe('EvaluationEditPage', () => {
  let component: EvaluationEditPageComponent;
  let fixture: ComponentFixture<EvaluationEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationEditPageComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EvaluationEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
