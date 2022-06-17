import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryVoucherComponent } from './entry-voucher.component';

describe('EntryVoucherComponent', () => {
  let component: EntryVoucherComponent;
  let fixture: ComponentFixture<EntryVoucherComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EntryVoucherComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryVoucherComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
