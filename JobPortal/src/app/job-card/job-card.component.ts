import { Component,Input, Output,EventEmitter } from '@angular/core';

@Component({
  selector: 'app-job-card',
  templateUrl: './job-card.component.html',
  styleUrl: './job-card.component.css'
})
export class JobCardComponent {
  showPopup: boolean = false;
  selectedJobDetails: any;

  @Input() jobs: any;
@Output() searchQueryChange = new EventEmitter<string>();
@Output() closePopupEvent = new EventEmitter();
  constructor() { }

  showJobDetails(job: any) {
    this.selectedJobDetails = job;
    this.showPopup = true;
  }

  closePopup() {
    this.showPopup = false;
  }
}
