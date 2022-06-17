import { ComponentFixture, TestBed } from '@angular/core/testing';

import { VehiculeNavBarComponent } from './vehicule-nav-bar.component';

describe('VehiculeNavBarComponent', () => {
  let component: VehiculeNavBarComponent;
  let fixture: ComponentFixture<VehiculeNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ VehiculeNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(VehiculeNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
