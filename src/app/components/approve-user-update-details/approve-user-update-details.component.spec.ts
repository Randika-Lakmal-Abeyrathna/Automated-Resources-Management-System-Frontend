import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ApproveUserUpdateDetailsComponent } from './approve-user-update-details.component';

describe('ApproveUserUpdateDetailsComponent', () => {
  let component: ApproveUserUpdateDetailsComponent;
  let fixture: ComponentFixture<ApproveUserUpdateDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ApproveUserUpdateDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ApproveUserUpdateDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
