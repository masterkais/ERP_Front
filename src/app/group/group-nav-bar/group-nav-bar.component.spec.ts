import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GroupNavBarComponent } from './group-nav-bar.component';

describe('GroupNavBarComponent', () => {
  let component: GroupNavBarComponent;
  let fixture: ComponentFixture<GroupNavBarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GroupNavBarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GroupNavBarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
