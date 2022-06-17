import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryssRequestTransertComponent } from './categoryss-request-transert.component';

describe('CategoryssRequestTransertComponent', () => {
  let component: CategoryssRequestTransertComponent;
  let fixture: ComponentFixture<CategoryssRequestTransertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CategoryssRequestTransertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoryssRequestTransertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
