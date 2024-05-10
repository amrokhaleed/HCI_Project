import { Component,ViewChild,ElementRef } from '@angular/core';

@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent {
  logoUrl: string | null = null;

  @ViewChild('fileInput') fileInput!: ElementRef<HTMLInputElement>;

  openFilePicker(): void {
    this.fileInput.nativeElement.click();
  }

  onFileSelected(event: any): void {
    const file: File = event.target.files[0];
    const reader = new FileReader();
    reader.onload = (e: any) => {
      this.logoUrl = e.target.result;
    };
    reader.readAsDataURL(file);
  }

  // Locations Editor
  locations: string[] = ['Cairo, Egypt', 'Addis Ababa, Ethiopia', 'Dakar, Senegal', 'Bremen, Germany', 'Berlin, Germany'];
  isEditing: boolean[] = new Array(this.locations.length).fill(false);
  editedLocations: string[] = new Array(this.locations.length).fill('');

  toggleEdit(index: number): void {
    this.isEditing[index] = !this.isEditing[index];
    if (!this.isEditing[index]) {
      this.editedLocations[index] = '';
    }
  }

  saveLocation(index: number): void {
    this.locations[index] = this.editedLocations[index];
    this.toggleEdit(index);
  }
}
