import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarCategoryComponent } from './nav-bar-category.component';

describe('NavBarCategoryComponent', () => {
  let component: NavBarCategoryComponent;
  let fixture: ComponentFixture<NavBarCategoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarCategoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarCategoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
