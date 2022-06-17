import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddVehiculeComponent } from './add-vehicule.component';

describe('AddVehiculeComponent', () => {
  let component: AddVehiculeComponent;
  let fixture: ComponentFixture<AddVehiculeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddVehiculeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddVehiculeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
