import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarRequestTransfertComponent } from './nav-bar-request-transfert.component';

describe('NavBarRequestTransfertComponent', () => {
  let component: NavBarRequestTransfertComponent;
  let fixture: ComponentFixture<NavBarRequestTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarRequestTransfertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarRequestTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
