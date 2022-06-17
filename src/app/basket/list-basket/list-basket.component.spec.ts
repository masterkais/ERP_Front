import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListBasketComponent } from './list-basket.component';

describe('ListBasketComponent', () => {
  let component: ListBasketComponent;
  let fixture: ComponentFixture<ListBasketComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListBasketComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListBasketComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
