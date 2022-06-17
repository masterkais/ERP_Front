import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRowMaterialComponent } from './list-row-material.component';

describe('ListRowMaterialComponent', () => {
  let component: ListRowMaterialComponent;
  let fixture: ComponentFixture<ListRowMaterialComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRowMaterialComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRowMaterialComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
