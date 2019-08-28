import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { IonicModule } from '@ionic/angular';

import { UsersListPageComponent } from './users-list-page.component';

describe('UsersListPage', () => {
  let component: UsersListPageComponent;
  let fixture: ComponentFixture<UsersListPageComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [UsersListPageComponent],
      imports: [IonicModule.forRoot()]
    }).compileComponents();

    fixture = TestBed.createComponent(UsersListPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
