import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SiteStockComponent } from './site-stock.component';

describe('SiteStockComponent', () => {
  let component: SiteStockComponent;
  let fixture: ComponentFixture<SiteStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SiteStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SiteStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
