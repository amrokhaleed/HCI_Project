import { Component, inject } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { IsloggedService } from '../../services/islogged.service';


@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {

  errormessage:string | null = null;

  email = '';
  password = '';
  authservices = inject(AuthService);


  constructor(private router: Router,private isLogged: IsloggedService) {}

  submitForm(){
    if (this.password.length === 0 || this.email.length === 0) {
      this.errormessage ='You didn\'t Enter Email Or Password';
      return;
    }

    this.authservices.login(this.email,this.password).subscribe({
      next:()=>{
        let s: string='';
        this.authservices.getCurenttype().subscribe((name: string) => {
          s = name;
          console.log('Current type:', s);
          this.isLogged.sharedData = true;
          if (s === "user") {
            this.router.navigate(['/home']);
          }
          // else {
          //   this.router.navigate(['/company-home']);
          // }
        });

        console.log(s);

      },
      error:(err)=>{
        this.errormessage = "Invalid Email or Password !";
      }
    });
  }

  registerAsCompany() {
    this.router.navigate(['/company-registeration']);
  }

  registerAsUser() {
    this.router.navigate(['/user-registeration']);
  }
}
