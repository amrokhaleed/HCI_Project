import { Component, OnInit, ViewChild, ElementRef, AfterViewInit, inject } from '@angular/core';
import { Job } from '../Interfaces/job';
import { AccountsDataService } from '../services/accounts-data.service';
import { JobsDataService } from '../services/jobs-data.service';
import { company_account } from '../Interfaces/company-account';
import { UploadFileService } from '../services/upload-file-service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrls: ['./add-job.component.css']
})
export class AddJobComponent implements OnInit, AfterViewInit {

  company: company_account | undefined;

  @ViewChild('qualificationsList') qualificationsList: ElementRef | undefined;
  @ViewChild('responsibilitiesList') responsibilitiesList: ElementRef | undefined;
  @ViewChild('fileInput') fileInput: any;

  errormessage = '';
  succesmessage = '';
  loading='';

  title = '';
  salary = 0;
  location = '';
  date = '';
  id = '';
  qualification: string[] = [];
  responsibility: string[] = [];
  description = '';
  selectedJobType = '';
  selectedsettings = '';
  imageUrl =''
  image: File | null = null;
  data:any;
  check:boolean=false;
  constructor(private route:ActivatedRoute,private jobdatabase: JobsDataService, private companydatabase: AccountsDataService, private uploadService: UploadFileService) {
    this.route.queryParams.subscribe(params => {
      if (params['job']) {
        this.check = true;
        const jobData = JSON.parse(decodeURIComponent(params['job']));
        console.log(jobData);
        this.id = jobData.id;
        this.title = jobData.title;
        this.selectedsettings = jobData.setting;
        this.salary = jobData.salary;
        this.location = jobData.location;
        this.date = jobData.date;
        this.imageUrl = jobData.imageUrl;
        this.selectedJobType = jobData.type;
        this.description = jobData.description;
        this.responsibility = jobData.responsibilities;
        this.qualification = jobData.qualifications;
      }
    });
  }

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


  handleFileInput(event: any) {
    this.image = event.target.files[0];
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
    let s = 'div';
    const listItems = ulElement.querySelectorAll('div');
    if(this.check){
      const listItems = ulElement.querySelectorAll('li');
    }

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

  resetForm(){
    // Reset form fields
    this.title = '';
    this.salary = 0;
    this.location = '';
    this.date = '';
    this.image = null;
    this.qualification = [];
    this.responsibility = [];
    this.description = '';
    this.selectedJobType = '';
    this.selectedsettings = '';
    this.fileInput.nativeElement.value = '';
    this.loading='';

    // Clear the content of the lists
    if (this.qualificationsList) {
      this.clearListItems(this.qualificationsList.nativeElement);
    }
    if (this.responsibilitiesList) {
      this.clearListItems(this.responsibilitiesList.nativeElement);
    }
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

    if (this.title === '' || this.salary === 0 || this.location === '' || this.date === '' || this.image === null || this.qualification.length === 0 || this.responsibility.length === 0 || this.description === '' || this.selectedJobType === '' || this.selectedsettings === '') {
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
      imageUrl: '',
      responsibilities: this.responsibility,
      qualifications: this.qualification
    };

    this.errormessage = '';
    this.loading='Loading..........';

    const filePath: string = `cvs/${Date.now()}_${this.image.name}`;

    this.uploadService.uploadimage(this.image, filePath).then(
      (res: string) => {

        newjob.imageUrl = res;
        if(this.check){
          this.jobdatabase.updateJob(this.id,newjob);
        }
        else{
          this.jobdatabase.addjob(newjob);
        }
        this.errormessage = '';
        this.succesmessage = 'Success, job added';
        this.resetForm();
        setTimeout(() => {
        this.succesmessage = '';
      }, 10000);
      },
      (error: any) => {
        this.errormessage = error.message;
        this.loading='';
      }
    );
  }

}
