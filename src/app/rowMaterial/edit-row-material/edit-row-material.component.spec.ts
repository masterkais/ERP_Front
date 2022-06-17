import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditRowMaterialComponent } from './edit-row-material.component';

describe('EditRowMaterialComponent', () => {
  let component: EditRowMaterialComponent;
  let fixture: ComponentFixture<EditRowMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditRowMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditRowMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
