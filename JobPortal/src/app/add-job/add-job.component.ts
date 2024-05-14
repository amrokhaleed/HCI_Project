import { Component, inject, OnInit } from '@angular/core';
import { Job } from '../Interfaces/job';
import { AccountsDataService } from '../services/accounts-data.service';
import { JobsDataService } from '../services/jobs-data.service';
import { company_account } from '../Interfaces/company-account';

@Component({
  selector: 'app-add-job',
  templateUrl: './add-job.component.html',
  styleUrl: './add-job.component.css'
})
export class AddJobComponent implements OnInit {


  jobdatabase = inject(JobsDataService);
  companydatabase = inject(AccountsDataService);
  company: company_account | undefined;


  errormessage ='';
  succesmessage='';

  title='';
  salary=0;
  location='';
  date='';
  imageurl='';
  qualification='';
  responsibility='';
  description='';
  selectedJobType='';
  selectedsettings='';




  ngOnInit(): void {
    

    const ayhaga = this.companydatabase.getcompanyobject()
    .subscribe((company: company_account | undefined) => {
      this.company=company;
    }
  );

  }


  addjob(){

    if(!(this.companydatabase.gettype()==='company')){
      this.errormessage='you are not company account';
      return;
    }

    if(this.title==='' || this.salary===0 ||this.location==='' ||this.date==='' ||this.imageurl==='' ||this.qualification==='' ||this.responsibility==='' ||this.description==='' ||this.selectedJobType==='' ||this.selectedsettings==='' ){
      this.errormessage='Enter all data about job';
      return;
    }


    const newjob: Job = {

      email : this.company?.email??'',
      title: this.title,
      company: this.company?.name??'',
      aboutCompany: this.company?.desc??'',
      location: this.location,
      setting: this.selectedsettings,
      salary: this.salary,
      description: this.description,
      type: this.selectedJobType,
      date: this.date,
      imageUrl: this.imageurl,
      responsibilities: this.responsibility,
      qualifications: this.qualification
    }

    this.jobdatabase.addjob(newjob);
    this.errormessage ='';
    this.succesmessage='success , job added';
    this.errormessage ='';

    this.title='';
    this.salary=0;
    this.location='';
    this.date='';
    this.imageurl='';
    this.qualification='';
    this.responsibility='';
    this.description='';
    this.selectedJobType='';
    this.selectedsettings='';
    setTimeout(() => {
      this.succesmessage='';
    }, 10000);


  }





}
