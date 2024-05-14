import { Component, inject, OnInit } from '@angular/core';
import { nanoid } from 'nanoid';
import { Subscription } from 'rxjs';
import { User_account } from '../../Interfaces/user-account';
import { AccountsDataService } from '../../services/accounts-data.service';
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent implements OnInit{
  portfolioItems: string[] = []; // Array to store uploaded photo URLs
  database = inject(AccountsDataService);
  userSubscription: Subscription | undefined;
  skills: string[] =[];
  isEditingProfile: boolean = false;
  hourlyRate: number = 5; // Initial hourly rate
  country: string = 'Cairo, Egypt'; // Initial country
  description: string = '';
  job_title :string='';
  username=''
  isEditingg: boolean = false;

  user: User_account | undefined;


  ngOnInit(): void {
    this.userSubscription = this.database.getuserobject()
      .subscribe((user: User_account | undefined) => {
        this.user = user;
        if (this.user) { // Check if user is defined
          this.skills = this.user.skills ?? [];
          this.country = this.user.address ?? '';
          this.description = this.user.decription_of_job??'';
          this.hourlyRate =this.user.salary??0;
          this.job_title=this.user.job_title??'';
          const shortRandomHash = nanoid();
          if (this.user && this.user.lname) {
            this.user.lname = this.user.lname.charAt(0).toUpperCase() + this.user.lname.slice(1);
          }

          this.username = (this.user?.fname ?? '') + (this.user?.lname ?? '') +  shortRandomHash.substring(0, 4);//+shortRandomHash;
        }
      });


  }

  ngOnDestroy(): void {
    // Unsubscribe from the userSubscription to avoid memory leaks
    if (this.userSubscription) {
      this.userSubscription.unsubscribe();
    }
  }




  // Method to handle file selection
  onFilesSelected(event: any) {
    const files: FileList = event.target.files;
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      this.readFile(file);
    }
  }

  // Method to read file as data URL
  readFile(file: File) {
    const reader = new FileReader();
    reader.onload = (e: any) => {
      const url = e.target.result;
      this.portfolioItems.push(url);
    };
    reader.readAsDataURL(file);
  }



  toggleEditProfile() {
    this.isEditingProfile = !this.isEditingProfile;

    if (!this.isEditingProfile) {
      //console.log("i am in if ");
        // Remove skills with length 0
        for (let i = 0; i < this.skills.length; i++) {
            if (this.skills[i].length === 0) {
                this.skills.splice(i, 1);
                i--; // Decrement i to account for the removed element
            }
        }

        const newUser: User_account = {
          fname:  this.user?.fname,
          lname: this.user?.lname,
          email: this.user?.email,
          password: this.user?.password,
          address:this.country,
          decription_of_job:this.description,
          job_title:this.job_title,
          salary:this.hourlyRate,
          skills:this.skills,
          jobs_completed:this.user?.jobs_completed
        };

        this.database.updateUser(newUser);


    }
  }



  addSkill() {
    if(this.isEditingProfile){
      this.skills.push('');
    }


  }
}
