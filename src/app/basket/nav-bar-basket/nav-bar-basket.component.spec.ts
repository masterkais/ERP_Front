import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarBasketComponent } from './nav-bar-basket.component';

describe('NavBarBasketComponent', () => {
  let component: NavBarBasketComponent;
  let fixture: ComponentFixture<NavBarBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarBasketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
