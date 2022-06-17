import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListCaddyComponent } from './list-caddy.component';

describe('ListCaddyComponent', () => {
  let component: ListCaddyComponent;
  let fixture: ComponentFixture<ListCaddyComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ListCaddyComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ListCaddyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
