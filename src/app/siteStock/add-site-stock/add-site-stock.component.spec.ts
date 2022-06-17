import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSiteStockComponent } from './add-site-stock.component';

describe('AddSiteStockComponent', () => {
  let component: AddSiteStockComponent;
  let fixture: ComponentFixture<AddSiteStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSiteStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSiteStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
