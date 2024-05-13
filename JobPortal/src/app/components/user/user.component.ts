import { Component } from '@angular/core';
interface Skill {
  name: string;
}
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrl: './user.component.css'
})
export class UserComponent {

  portfolioItems: string[] = []; // Array to store uploaded photo URLs

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
  isEditingProfile: boolean = false;
  hourlyRate: number = 5; // Initial hourly rate
  country: string = 'Cairo, Egypt'; // Initial country
  description: string = '';
  isEditingg: boolean = false;
  toggleEditProfile() {
    this.isEditingProfile = !this.isEditingProfile;

    if (!this.isEditingProfile) {
        // Remove skills with length 0
        for (let i = 0; i < this.skills.length; i++) {
            if (this.skills[i].name.length === 0) {
                this.skills.splice(i, 1);
                i--; // Decrement i to account for the removed element
            }
        }
    }
  }

  skills: Skill[] = [{name: '' }];

  addSkill() {
    if(this.isEditingProfile){
      this.skills.push({ name: '' });
    }


  }
}
