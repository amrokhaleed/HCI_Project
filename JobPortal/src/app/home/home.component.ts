import { Component, Input, inject } from '@angular/core';
import { on } from 'events';
import { AccountsDataService } from '../services/accounts-data.service';
import { JobsDataService } from '../services/jobs-data.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  allJobs: any[] = []; // assuming this is where you store your jobs data
  filteredJobs: any[] = [];
  searchQuery: string = '';
  dataLoaded: boolean = false;
  accountData = inject(AccountsDataService);
  jobdata = inject(JobsDataService);
  homeUserType: string='';
    constructor(private jobData: JobsDataService) { }

    ngOnInit() {
      this.homeUserType =this.accountData.gettype();
      // Fetch data when component initializes
      if(this.homeUserType === "user") {
        this.jobData.getAlljobs().subscribe((jobs) => {
          this.allJobs = jobs;
          this.filteredJobs = this.allJobs; // Initialize filteredJobs with allJobs
          this.dataLoaded = true; // Set the flag to true after data is fetched
          console.log("this is home" + this.allJobs);  // Check if data is fetched successfully
        });
      }
      else {
        this.jobData.getJobsByEmail(this.accountData.getemail()).subscribe((jobs) => {
          this.filteredJobs = jobs;
          this.dataLoaded = true;
        });
      }
    }

  onSearch(query: string[]) {
    // Filter jobs based on the search query
    if (!query[0].trim() && !query[1].trim()) {
      // If the search query is empty, show all jobs
      this.filteredJobs = this.allJobs;
    } else {
      this.filteredJobs = this.allJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(query[0].toLowerCase()) &&
          (job.location.toLowerCase().includes(query[1].toLowerCase()) ||
            job.salary.toLowerCase().includes(query[1].toLowerCase()))
      );
    }
  }
}
