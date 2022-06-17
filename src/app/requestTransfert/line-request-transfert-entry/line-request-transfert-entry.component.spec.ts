import { ComponentFixture, TestBed } from '@angular/core/testing';

import { LineRequestTransfertEntryComponent } from './line-request-transfert-entry.component';

describe('LineRequestTransfertEntryComponent', () => {
  let component: LineRequestTransfertEntryComponent;
  let fixture: ComponentFixture<LineRequestTransfertEntryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ LineRequestTransfertEntryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LineRequestTransfertEntryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
