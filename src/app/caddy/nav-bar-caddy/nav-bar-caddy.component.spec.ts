import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarCaddyComponent } from './nav-bar-caddy.component';

describe('NavBarCaddyComponent', () => {
  let component: NavBarCaddyComponent;
  let fixture: ComponentFixture<NavBarCaddyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarCaddyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarCaddyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
