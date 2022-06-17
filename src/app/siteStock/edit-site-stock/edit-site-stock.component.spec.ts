import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditSiteStockComponent } from './edit-site-stock.component';

describe('EditSiteStockComponent', () => {
  let component: EditSiteStockComponent;
  let fixture: ComponentFixture<EditSiteStockComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditSiteStockComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditSiteStockComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
