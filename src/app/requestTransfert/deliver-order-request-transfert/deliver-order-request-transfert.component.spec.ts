import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeliverOrderRequestTransfertComponent } from './deliver-order-request-transfert.component';

describe('DeliverOrderRequestTransfertComponent', () => {
  let component: DeliverOrderRequestTransfertComponent;
  let fixture: ComponentFixture<DeliverOrderRequestTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeliverOrderRequestTransfertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeliverOrderRequestTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
