import { Component, inject } from '@angular/core';
import { AccountsDataService } from '../../services/accounts-data.service';
import { Router } from '@angular/router';
import { company_account } from '../../Interfaces/company-account';
import { AuthService } from '../../services/auth.service';


@Component({
  selector: 'app-company-registeration',
  templateUrl: './company-registeration.component.html',
  styleUrl: './company-registeration.component.css'
})
export class CompanyRegisterationComponent {

  termsAccepted: boolean = false;
  errormassage:string | null = null;
  CompanyName='';
  PhoneNumber='';
  Address='';
  email = '';
  password = '';
  confirmPassword = '';
  authservices = inject(AuthService);

  constructor(private dataService: AccountsDataService, private router: Router) { }

  addCompany(): void {

    if (!this.termsAccepted) {

      this.errormassage ='You should accept the Terms of Use & Privacy Policy';
      return;
    }

    if (this.CompanyName === '' || this.PhoneNumber === '' || this.Address === '' || this.email === '' || this.password === '') {
      this.errormassage ='Enter all data ';
      return;
    }

    if (this.password != this.confirmPassword) {
      this.errormassage ='Passwords do not match';
      return;
    }

    if (this.password.length< 8) {
      this.errormassage ='Passwords should greater than 8 characters';
      return;
    }


    if (this.email.length < 11) {
      this.errormassage = 'email should greater than 10 characters';
      return;
    }


    const newCompany: company_account = {
      name: this.CompanyName,
      address: this.Address,
      phonenumber: this.PhoneNumber,
      email: this.email,
      password: this.password,
      desc:'',
      ceo:'',
      revenue:'',
      size:'',
      industry:'',
      foundation:'',
      head:'',
      locations:[]
    };



    this.authservices.register(this.email,'company',this.password).subscribe({
      next : ()=>{



        this.dataService.addcompany(newCompany).subscribe(
          id => {
            console.log('company added successfully with ID:', id);
            this.router.navigate(['/login']); // Navigate to login page after successful registration

          },
          error => {
            console.error('Error adding user:', error);
          }
        );
      },

      error : (err)=> {
        this.errormassage = err.code;
      },

  });



   /* this.dataService.checkCompaniesIfExists(newCompany.email).subscribe(
      (exists: boolean) => {
        if (!exists) {
          this.dataService.addcompany(newCompany).subscribe(
            id => {
              console.log('company added successfully with ID:', id);
              this.router.navigate(['/login']); // Navigate to login page after successful registration
              return;
            },
            error => {
              console.error('Error adding user:', error);
            }
          );
        }
      }
    );
    console.error('User already exists');*/

  }


}
