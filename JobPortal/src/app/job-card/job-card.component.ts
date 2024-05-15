import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { AccountsDataService } from '../services/accounts-data.service';
import { Router } from '@angular/router';
import { JobsDataService } from '../services/jobs-data.service';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
})
export class JobCardComponent {
  showPopup: boolean = false;
  selectedJobDetails: any;
  accountType = inject(AccountsDataService);
  jobCardUserType: string = '';
  @Input() jobs: any;
  @Output() searchQueryChange = new EventEmitter<string>();
  @Output() closePopupEvent = new EventEmitter();
  constructor(private router: Router, private jobData: JobsDataService) {}
  ngOnInit() {
    this.jobCardUserType = this.accountType.gettype();
    console.log(this.jobCardUserType);
    console.log(this.jobs);
    console.log(this.selectedJobDetails);
  }
  showJobDetails(job: any) {
    this.selectedJobDetails = job;
    this.showPopup = true;
  }
  editJob () {
    const queryParams = encodeURIComponent(JSON.stringify(this.jobs));
    this.router.navigate(['/add-job'], { queryParams: { job: queryParams } });
  }
  closePopup() {
    this.showPopup = false;
  }
  toAddJob() {
    this.router.navigate(['/add-job']);
  }
  deleteJob() {
    this.jobData.deleteJob(this.jobs.id).subscribe(() => {
      window.location.reload();
    });
  }
}
