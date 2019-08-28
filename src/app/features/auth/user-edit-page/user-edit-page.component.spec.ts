import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UserEditPageComponent } from './user-edit-page.component';

describe('UserEditPage', () => {
  let component: UserEditPageComponent;
  let fixture: ComponentFixture<UserEditPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UserEditPageComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UserEditPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
