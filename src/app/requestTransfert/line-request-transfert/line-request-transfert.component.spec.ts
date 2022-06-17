import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineRequestTransfertComponent } from './line-request-transfert.component';

describe('LineRequestTransfertComponent', () => {
  let component: LineRequestTransfertComponent;
  let fixture: ComponentFixture<LineRequestTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineRequestTransfertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineRequestTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
