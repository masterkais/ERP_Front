import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarRowMaterialComponent } from './nav-bar-row-material.component';

describe('NavBarRowMaterialComponent', () => {
  let component: NavBarRowMaterialComponent;
  let fixture: ComponentFixture<NavBarRowMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarRowMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarRowMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
