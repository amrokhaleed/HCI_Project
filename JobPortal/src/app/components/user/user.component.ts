import { Component } from '@angular/core';
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
}
