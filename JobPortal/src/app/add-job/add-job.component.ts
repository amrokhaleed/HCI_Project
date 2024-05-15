import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, inject } from '@angular/core';
import { Job } from '../Interfaces/job';
import { AccountsDataService } from '../services/accounts-data.service';
import { JobsDataService } from '../services/jobs-data.service';
import { company_account } from '../Interfaces/company-account';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit, AfterViewInit {
  jobdatabase = inject(JobsDataService);
  companydatabase = inject(AccountsDataService);
  company: company_account | undefined;

  @ViewChild('qualificationsList') qualificationsList: ElementRef | undefined;
  @ViewChild('responsibilitiesList') responsibilitiesList: ElementRef | undefined;

  errormessage = '';
  succesmessage = '';

  title = '';
  salary = 0;
  location = '';
  date = '';
  imageurl = '';
  qualification: string[] = [];
  responsibility: string[] = [];
  description = '';
  selectedJobType = '';
  selectedsettings = '';

  ngOnInit(): void {
    this.companydatabase.getcompanyobject()
      .subscribe((company: company_account | undefined) => {
        this.company = company;
      });
  }

  ngAfterViewInit(): void {
    this.addInputListenerToList(this.qualificationsList);
    this.addInputListenerToList(this.responsibilitiesList);
  }

  addInputListenerToList(ulElement: ElementRef | undefined): void {
    if (ulElement) {
      const listItem = ulElement.nativeElement.querySelector('li');
      if (listItem) {
        listItem.addEventListener('input', () => {
          this.wrapContentInDiv(listItem);
        });
      }
    }
  }

  wrapContentInDiv(liElement: HTMLElement): void {
    const childNodes = Array.from(liElement.childNodes);
    if (childNodes.length > 0) {
      childNodes.forEach(node => {
        if (node.nodeType === Node.TEXT_NODE && node.textContent?.trim()) {
          const div = document.createElement('div');
          div.textContent = node.textContent.trim();
          node.replaceWith(div);
        }
      });
    }
  }

  getListItems(ulElement: HTMLElement): string[] {
    const items: string[] = [];
    const listItems = ulElement.querySelectorAll('div');

    listItems.forEach((item: HTMLElement) => {
      const text = item.innerText.trim();
      if (text) {
        items.push(text);
      }
    });

    return items;
  }

  clearListItems(ulElement: HTMLElement): void {
    const listItems = ulElement.querySelectorAll('li');
    listItems.forEach((item: HTMLElement) => {
      item.innerHTML = '';
    });
  }

  addjob() {
    if (this.qualificationsList && this.responsibilitiesList) {
      this.qualification = this.getListItems(this.qualificationsList.nativeElement);
      this.responsibility = this.getListItems(this.responsibilitiesList.nativeElement);
    } else {
      this.errormessage = 'You should Enter Qualifications and Responsibilities';
      return;
    }

    if (this.companydatabase.gettype() !== 'company') {
      this.errormessage = 'You are not a company account';
      return;
    }

    if (this.title === '' || this.salary === 0 || this.location === '' || this.date === '' || this.imageurl === '' || this.qualification.length === 0 || this.responsibility.length === 0 || this.description === '' || this.selectedJobType === '' || this.selectedsettings === '') {
      this.errormessage = 'Enter all data about the job';
      return;
    }

    const newjob: Job = {
      email: this.company?.email ?? '',
      title: this.title,
      company: this.company?.name ?? '',
      aboutCompany: this.company?.desc ?? '',
      location: this.location,
      setting: this.selectedsettings,
      salary: this.salary,
      description: this.description,
      type: this.selectedJobType,
      date: this.date,
      imageUrl: this.imageurl,
      responsibilities: this.responsibility,
      qualifications: this.qualification
    };

    this.jobdatabase.addjob(newjob);
    this.errormessage = '';
    this.succesmessage = 'Success, job added';

    // Reset form fields
    this.title = '';
    this.salary = 0;
    this.location = '';
    this.date = '';
    this.imageurl = '';
    this.qualification = [];
    this.responsibility = [];
    this.description = '';
    this.selectedJobType = '';
    this.selectedsettings = '';

    // Clear the content of the lists
    if (this.qualificationsList) {
      this.clearListItems(this.qualificationsList.nativeElement);
    }
    if (this.responsibilitiesList) {
      this.clearListItems(this.responsibilitiesList.nativeElement);
    }

    // Clear success message after 10 seconds
    setTimeout(() => {
      this.succesmessage = '';
    }, 10000);
  }
}
