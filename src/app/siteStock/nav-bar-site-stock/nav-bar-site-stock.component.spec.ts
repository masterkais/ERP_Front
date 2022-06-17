import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavBarSiteStockComponent } from './nav-bar-site-stock.component';

describe('NavBarSiteStockComponent', () => {
  let component: NavBarSiteStockComponent;
  let fixture: ComponentFixture<NavBarSiteStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NavBarSiteStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavBarSiteStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
