import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { EvaluationAddPageComponent } from './evaluation-add-page.component';

describe('EvaluationAddPage', () => {
  let component: EvaluationAddPageComponent;
  let fixture: ComponentFixture<EvaluationAddPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [EvaluationAddPageComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(EvaluationAddPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
