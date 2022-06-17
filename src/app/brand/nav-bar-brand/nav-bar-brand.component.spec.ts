import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarBrandComponent } from './nav-bar-brand.component';

describe('NavBarBrandComponent', () => {
  let component: NavBarBrandComponent;
  let fixture: ComponentFixture<NavBarBrandComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarBrandComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarBrandComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
