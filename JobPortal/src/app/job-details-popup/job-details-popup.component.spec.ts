import { ComponentFixture, TestBed } from '@angular/core/testing';

import { JobDetailsPopupComponent } from './job-details-popup.component';

describe('JobDetailsPopupComponent', () => {
  let component: JobDetailsPopupComponent;
  let fixture: ComponentFixture<JobDetailsPopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [JobDetailsPopupComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(JobDetailsPopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
