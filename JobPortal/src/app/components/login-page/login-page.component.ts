import { Component } from '@angular/core';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  constructor(private router: Router) {}
  username: string = '';
  password: string = '';
  loginFailed: boolean = false

  registerAsCompany() {
    this.router.navigate(['/company-registeration']);
  }

  registerAsUser() {
    this.router.navigate(['/user-registeration']);
  }
}
