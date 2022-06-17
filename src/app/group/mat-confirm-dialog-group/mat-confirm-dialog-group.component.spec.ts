import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MatConfirmDialogGroupComponent } from './mat-confirm-dialog-group.component';

describe('MatConfirmDialogGroupComponent', () => {
  let component: MatConfirmDialogGroupComponent;
  let fixture: ComponentFixture<MatConfirmDialogGroupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MatConfirmDialogGroupComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MatConfirmDialogGroupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
