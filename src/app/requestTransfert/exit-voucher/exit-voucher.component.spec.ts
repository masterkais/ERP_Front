import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExitVoucherComponent } from './exit-voucher.component';

describe('ExitVoucherComponent', () => {
  let component: ExitVoucherComponent;
  let fixture: ComponentFixture<ExitVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ExitVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ExitVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
