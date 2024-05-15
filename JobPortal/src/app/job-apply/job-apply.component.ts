import { Component, ViewChild } from '@angular/core';
import { ApplyJopDataService } from '../services/apply-jop-data.service';
import { applyjob } from '../Interfaces/applyjob';
import { UploadFileService } from '../services/upload-file-service.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-job-apply',
  templateUrl: './job-apply.component.html',
  styleUrls: ['./job-apply.component.css']
})
export class JobApplyComponent {

  @ViewChild('fileInput') fileInput: any;

  email = '';
  address = '';
  city = '';
  lname = '';
  fname = '';
  date = '';
  cv: File | null = null;
  errormessage = '';
  succesmessage = '';
  loading='';
  emailCompany = '';
  idCompany = '';
  constructor(private database: ApplyJopDataService, private uploadService: UploadFileService,private route:ActivatedRoute) {
    this.route.queryParams.subscribe(params => {
      if (params['jobDetails']) {
        const jobData = JSON.parse(decodeURIComponent(params['jobDetails']));
        this.idCompany = jobData.id;
        this.emailCompany = jobData.email;
      }
    });
  }

  handleFileInput(event: any) {
    this.cv = event.target.files[0];
  }

  resetForm() {
    this.email = '';
    this.address = '';
    this.city = '';
    this.lname = '';
    this.fname = '';
    this.date = '';
    this.cv = null;
    this.errormessage = '';
    this.loading='';
    this.fileInput.nativeElement.value = '';
  }

  addappliction() {
    if (this.email === '' || this.address === '' || this.city === '' || this.lname === '' || this.fname === '' || this.cv === null) {
      this.errormessage = 'Enter all data about the job';
      return;
    }

    const newapplyjob: applyjob = {
      address: this.address,
      city: this.city,
      date: this.date,
      email: this.email,
      fname: this.fname,
      lname: this.lname,
      idOfJob: this.idCompany,
      emailofcompany: this.emailCompany,
      cvUrl: ''
    };

    this.errormessage = '';
    this.loading='Loading..........';

    const filePath: string = `cvs/${Date.now()}_${this.cv.name}`;
    this.uploadService.uploadFile(this.cv, filePath).then(
      (res: string) => {

        newapplyjob.cvUrl = res;
        this.database.addJobApplication(newapplyjob).subscribe(
          () => {
            this.succesmessage = 'Success, application added';
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
      },
      (error: any) => {
        this.errormessage = error.message;
        this.loading='';
      }
    );
  }
}
