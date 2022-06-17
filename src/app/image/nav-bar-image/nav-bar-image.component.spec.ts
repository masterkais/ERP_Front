import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarImageComponent } from './nav-bar-image.component';

describe('NavBarImageComponent', () => {
  let component: NavBarImageComponent;
  let fixture: ComponentFixture<NavBarImageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarImageComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarImageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
