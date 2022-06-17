import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddRowMaterialComponent } from './add-row-material.component';

describe('AddRowMaterialComponent', () => {
  let component: AddRowMaterialComponent;
  let fixture: ComponentFixture<AddRowMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddRowMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddRowMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
