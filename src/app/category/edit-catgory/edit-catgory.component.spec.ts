import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditCatgoryComponent } from './edit-catgory.component';

describe('EditCatgoryComponent', () => {
  let component: EditCatgoryComponent;
  let fixture: ComponentFixture<EditCatgoryComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EditCatgoryComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EditCatgoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
