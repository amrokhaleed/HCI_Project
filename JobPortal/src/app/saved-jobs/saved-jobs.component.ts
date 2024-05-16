import { Component, inject } from '@angular/core';
import { AccountsDataService } from '../services/accounts-data.service';
import { JobsDataService } from '../services/jobs-data.service';
import { JobsavedService } from '../services/jobsaved.service';
import { Job } from '../Interfaces/job';
import { savedjobs } from '../Interfaces/savedjobs';

@Component({
  selector: 'app-saved-jobs',
  templateUrl: './saved-jobs.component.html',
  styleUrls: ['./saved-jobs.component.css']
})
export class SavedJobsComponent {
  savedJobs: savedjobs[] = [];
  abdalla = inject(JobsavedService);
  accountType = inject(AccountsDataService);
  jobs: Job[] = [];

  constructor(private jobData: JobsDataService) { }

  ngOnInit() {
    let userEmail = this.accountType.getemail();

    this.abdalla.getsavedjobsByemailofuser(userEmail).subscribe((savedJobs: savedjobs[]) => {
      this.savedJobs = savedJobs;

      const uniqueSavedJobs = Array.from(new Set(savedJobs.map(savedJob => savedJob.idofjob)));

      // Fetch each saved job and populate the jobs array
      uniqueSavedJobs.forEach(idofjob => {
        this.jobData.getJobById(idofjob).subscribe((job: Job) => {
          this.jobs.push(job);
        });
      });
    });
  }
}
