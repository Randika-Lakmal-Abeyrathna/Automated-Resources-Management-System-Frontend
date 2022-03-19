import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DataentryDashboardComponent } from './dataentry-dashboard.component';

describe('DataentryDashboardComponent', () => {
  let component: DataentryDashboardComponent;
  let fixture: ComponentFixture<DataentryDashboardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DataentryDashboardComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DataentryDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
