import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarProductComponent } from './nav-bar-product.component';

describe('NavBarProductComponent', () => {
  let component: NavBarProductComponent;
  let fixture: ComponentFixture<NavBarProductComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarProductComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarProductComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
