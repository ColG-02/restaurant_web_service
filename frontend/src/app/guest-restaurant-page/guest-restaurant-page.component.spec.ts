import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestRestaurantPageComponent } from './guest-restaurant-page.component';

describe('GuestRestaurantPageComponent', () => {
  let component: GuestRestaurantPageComponent;
  let fixture: ComponentFixture<GuestRestaurantPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestRestaurantPageComponent]
    });
    fixture = TestBed.createComponent(GuestRestaurantPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
