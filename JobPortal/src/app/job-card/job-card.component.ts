import { Component, Input, Output, EventEmitter, inject } from '@angular/core';
import { AccountsDataService } from '../services/accounts-data.service';
import { Router } from '@angular/router';
import { JobsDataService } from '../services/jobs-data.service';
import { JobsavedService } from '../services/jobsaved.service';
import { savedjobs } from '../Interfaces/savedjobs';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css',
})
export class JobCardComponent {


  showPopup: boolean = false;
  selectedJobDetails: any;
  abdalla = inject(JobsavedService);
  accountType = inject(AccountsDataService);

  jobCardUserType: string = '';
  saved:boolean = false;
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


  toggleSaving(){
    // Flip the saved state locally first
    const save:savedjobs = {
      idofjob:this.jobs.id,
      emailofuser:this.accountType.getemail()
    };
    this.abdalla.savejob(save);
    //console.log(this.jobs);

   /* this.jobs.id;
this.jobs.em;*/

  }


  toggledelete() {
    this.abdalla.unsavejob(this.jobs.id).subscribe(() => {
      console.log('Job successfully deleted');
    }, error => {
      console.error('Error deleting job:', error);
    });

  }

}
