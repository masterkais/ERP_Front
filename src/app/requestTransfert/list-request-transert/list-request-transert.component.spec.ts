import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListRequestTransertComponent } from './list-request-transert.component';

describe('ListRequestTransertComponent', () => {
  let component: ListRequestTransertComponent;
  let fixture: ComponentFixture<ListRequestTransertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListRequestTransertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListRequestTransertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
