import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WaiterReservationsPageComponent } from './waiter-reservations-page.component';

describe('WaiterReservationsPageComponent', () => {
  let component: WaiterReservationsPageComponent;
  let fixture: ComponentFixture<WaiterReservationsPageComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [WaiterReservationsPageComponent]
    });
    fixture = TestBed.createComponent(WaiterReservationsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
