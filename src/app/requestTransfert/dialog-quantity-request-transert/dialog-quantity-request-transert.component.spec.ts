import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DialogQuantityRequestTransertComponent } from './dialog-quantity-request-transert.component';

describe('DialogQuantityRequestTransertComponent', () => {
  let component: DialogQuantityRequestTransertComponent;
  let fixture: ComponentFixture<DialogQuantityRequestTransertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DialogQuantityRequestTransertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DialogQuantityRequestTransertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
