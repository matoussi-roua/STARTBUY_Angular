import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UsersforadminComponent } from './usersforadmin.component';

describe('UsersforadminComponent', () => {
  let component: UsersforadminComponent;
  let fixture: ComponentFixture<UsersforadminComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [UsersforadminComponent]
    });
    fixture = TestBed.createComponent(UsersforadminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
