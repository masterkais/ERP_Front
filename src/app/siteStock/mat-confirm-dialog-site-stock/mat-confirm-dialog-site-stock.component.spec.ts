import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatConfirmDialogSiteStockComponent } from './mat-confirm-dialog-site-stock.component';

describe('MatConfirmDialogSiteStockComponent', () => {
  let component: MatConfirmDialogSiteStockComponent;
  let fixture: ComponentFixture<MatConfirmDialogSiteStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatConfirmDialogSiteStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatConfirmDialogSiteStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
