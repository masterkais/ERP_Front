import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarSalesComponent } from './navbar-sales.component';

describe('NavbarSalesComponent', () => {
  let component: NavbarSalesComponent;
  let fixture: ComponentFixture<NavbarSalesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavbarSalesComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarSalesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
