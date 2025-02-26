import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PasswordChangePageComponent } from './password-change-page.component';

describe('PasswordChangePageComponent', () => {
  let component: PasswordChangePageComponent;
  let fixture: ComponentFixture<PasswordChangePageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [PasswordChangePageComponent]
    });
    fixture = TestBed.createComponent(PasswordChangePageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
