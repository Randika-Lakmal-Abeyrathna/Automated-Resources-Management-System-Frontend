import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherOnboardComponent } from './teacher-onboard.component';

describe('TeacherOnboardComponent', () => {
  let component: TeacherOnboardComponent;
  let fixture: ComponentFixture<TeacherOnboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherOnboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherOnboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
