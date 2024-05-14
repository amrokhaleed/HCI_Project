import { Component,ViewChild,ElementRef ,inject, OnInit} from '@angular/core';
import { Subscription } from 'rxjs';
import { company_account } from '../../Interfaces/company-account';
import { AccountsDataService } from '../../services/accounts-data.service';
@Component({
  selector: 'app-company',
  templateUrl: './company.component.html',
  styleUrl: './company.component.css'
})
export class CompanyComponent implements OnInit{

  database = inject(AccountsDataService);
  companySubscription: Subscription | undefined;
  logoUrl: string | null = null;
  company:company_account | undefined;
  name:string='';
  ceo:string='';
  description:string='';
  rev:string='';
  revenue:string="";
  foundation:string = "";
  industry:string="";
  size:string="";
  head:string="";

  ngOnInit(): void {
    this.companySubscription = this.database.getcompanyobject()
      .subscribe((company: company_account | undefined) => {
        this.company = company;
        if (this.company) { // Check if user is defined
          this.locations = this.company.locations ?? [];
          this.rev = this.company.revenue ?? '';
          this.description = this.company.desc??'';
          this.ceo =this.company.ceo??'';
          this.size=this.company.size??'';
          this.name = this.company.name??'';
          this.foundation = this.company.foundation??'';
          this.industry = this.company.industry??'';
          this.head = this.company.head??'';
        }
      });
  }
  reviews = [
    {
      username: "JohnDoe",
      comment: "Great Company and I advise anyone to work with them. Thanks for your services."
    },
    {
      username: "JaneSmith",
      comment: "Excellent service! I highly recommend them to everyone."
    },
    {
      username: "MikeJohnson",
      comment: "Amazing experience! Will definitely work with them again."
    }
  ];
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

  // Handling Input field

  editingProfile: boolean = false;
  locations: string[] = [];
  toggleEditProfile() {
    this.editingProfile = !this.editingProfile;
    if (!this.editingProfile) {
        for (let i = 0; i < this.locations.length; i++) {
            if (this.locations[i].length === 0) {
                this.locations.splice(i, 1);
                i--; // Decrement i to account for the removed element
            }
        }
      }
      const newUser: company_account = {
        name:  this.company?.name,
        email: this.company?.email,
        password: this.company?.password,
        address:this.company?.address,
        phonenumber:this.company?.phonenumber,
        ceo: this.ceo,
        desc:this.description,
        revenue:this.rev,
        size:this.size,
        industry:this.industry,
        head:this.head,
        locations:this.locations,
      };

      this.database.updateCompany(newUser);
  }
  addLocation() {
    if(this.editingProfile){
      this.locations.push('');
    }
  }
}
