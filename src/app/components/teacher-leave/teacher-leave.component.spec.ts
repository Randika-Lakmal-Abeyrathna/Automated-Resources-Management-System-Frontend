import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherLeaveComponent } from './teacher-leave.component';

describe('TeacherLeaveComponent', () => {
  let component: TeacherLeaveComponent;
  let fixture: ComponentFixture<TeacherLeaveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherLeaveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherLeaveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
