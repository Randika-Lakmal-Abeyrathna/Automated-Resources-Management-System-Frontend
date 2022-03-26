import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherRequestComponent } from './teacher-request.component';

describe('TeacherRequestComponent', () => {
  let component: TeacherRequestComponent;
  let fixture: ComponentFixture<TeacherRequestComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TeacherRequestComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherRequestComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
