import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductsRequestTransertComponent } from './products-request-transert.component';

describe('ProductsRequestTransertComponent', () => {
  let component: ProductsRequestTransertComponent;
  let fixture: ComponentFixture<ProductsRequestTransertComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductsRequestTransertComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductsRequestTransertComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
