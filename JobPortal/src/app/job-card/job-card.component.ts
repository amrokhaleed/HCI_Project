import { Component } from '@angular/core';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css'
})
export class JobCardComponent {
  showPopup: boolean = false;
  selectedJobDetails: any;

  jobs = [
    {
      title: 'UI UX Designer',
      company: 'Amazon',
      location: 'Jakarta, ID',
      salary: '5000-8000',
      type: 'Full-time',
      date: '3 July 2023',
      imageUrl: 'https://www.google.com/url?sa=i&url=https%3A%2F%2Ffreebiesupply.com%2Flogos%2Famazon-dark-logo%2F&psig=AOvVaw1VdyhlJCHOeJu-ydc-zRUF&ust=1715288247690000&source=images&cd=vfe&opi=89978449&ved=0CBIQjRxqFwoTCIjLv-f4_oUDFQAAAAAdAAAAABAZ',
      responsibilities: 'Responsibilities of UI UX Designer...',
      qualifications: 'Qualifications of UI UX Designer...',
      benefits: 'Benefits of UI UX Designer...',
      howToApply: 'How to apply for UI UX Designer...'
    }
  ];

  constructor() { }

  showJobDetails(job: any) {
    this.selectedJobDetails = job;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
}
