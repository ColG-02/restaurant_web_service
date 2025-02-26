import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GuestRestaurantDetailsPageComponent } from './guest-restaurant-details-page.component';

describe('GuestRestaurantDetailsPageComponent', () => {
  let component: GuestRestaurantDetailsPageComponent;
  let fixture: ComponentFixture<GuestRestaurantDetailsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [GuestRestaurantDetailsPageComponent]
    });
    fixture = TestBed.createComponent(GuestRestaurantDetailsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
