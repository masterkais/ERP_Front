import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListSiteStockComponent } from './list-site-stock.component';

describe('ListSiteStockComponent', () => {
  let component: ListSiteStockComponent;
  let fixture: ComponentFixture<ListSiteStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListSiteStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListSiteStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
