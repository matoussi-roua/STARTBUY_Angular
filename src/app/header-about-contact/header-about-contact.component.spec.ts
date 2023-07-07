import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderAboutContactComponent } from './header-about-contact.component';

describe('HeaderAboutContactComponent', () => {
  let component: HeaderAboutContactComponent;
  let fixture: ComponentFixture<HeaderAboutContactComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderAboutContactComponent]
    });
    fixture = TestBed.createComponent(HeaderAboutContactComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
