import { inject,Component } from '@angular/core';
import { Router } from '@angular/router'; // Import Router
import {  AccountsDataService} from '../../services/accounts-data.service';// Adjust the path as per your project structure
import {  AuthService} from '../../services/auth.service';
import { User_account } from '../../Interfaces/user-account'; // Import the user interface
import { subscribe } from 'diagnostics_channel';

@Component({
  selector: 'app-user-registeration',
  templateUrl: './user-registeration.component.html',
  styleUrls: ['./user-registeration.component.css'] // Correct the property name from styleUrl to styleUrls
})
export class UserRegisterationComponent {

  userisexist: boolean = false;
  termsAccepted: boolean = false;
  errormassage:string | null = null;

  fname = '';
  lname = '';
  email = '';
  password = '';
  confirmPassword = '';
  authservices = inject(AuthService);


  constructor(private dataService: AccountsDataService, private router: Router) { } // Inject Router


  addUser(): void {
    if (!this.termsAccepted) {
      this.errormassage ='You should accept the Terms of Use & Privacy Policy';
      return;
    }

    if (this.fname === '' || this.lname === '' || this.email === '' || this.password === '') {
      this.errormassage ='Enter all data ';
      return;
    }

    if (this.password.length< 8) {
      this.errormassage ='Passwords should greater than 8 characters';
      return;
    }

    if (this.password != this.confirmPassword) {
      this.errormassage ='Passwords do not match';
      return;
    }

    if (this.email.length < 11) {
      this.errormassage = 'email should greater than 10 characters';
      return;
    }

    const newUser: User_account = {
      fname: this.fname,
      lname: this.lname,
      email: this.email,
      password: this.password,
      address:'',
      decription_of_job:'',
      job_title:'',
      salary:'',
      skills:'',
      jobs_completed:''
    };


    this.authservices.register(this.email,'user',this.password).subscribe({
      next : ()=>{



        this.dataService.addUser(newUser).subscribe(
          id => {
            console.log('User added successfully with ID:', id);
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

    /*this.dataService.checkUserIfExists(newUser.email).subscribe(
      (exists: boolean) => {
        if (!exists) {
          this.dataService.addUser(newUser).subscribe(
            id => {
              console.log('User added successfully with ID:', id);
              this.router.navigate(['/login']); // Navigate to login page after successful registration
              return;
            },
            error => {
              console.error('Error adding user:', error);
            }
          );
        } else {
          console.error('User already exists');
        }
      }
    );*/
  }
}
