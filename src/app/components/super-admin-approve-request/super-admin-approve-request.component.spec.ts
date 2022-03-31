import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SuperAdminApproveRequestComponent } from './super-admin-approve-request.component';

describe('SuperAdminApproveRequestComponent', () => {
  let component: SuperAdminApproveRequestComponent;
  let fixture: ComponentFixture<SuperAdminApproveRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SuperAdminApproveRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SuperAdminApproveRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
