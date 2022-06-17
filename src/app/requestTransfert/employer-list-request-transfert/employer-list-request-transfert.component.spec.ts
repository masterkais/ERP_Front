import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmployerListRequestTransfertComponent } from './employer-list-request-transfert.component';

describe('EmployerListRequestTransfertComponent', () => {
  let component: EmployerListRequestTransfertComponent;
  let fixture: ComponentFixture<EmployerListRequestTransfertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmployerListRequestTransfertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmployerListRequestTransfertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
