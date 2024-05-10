import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { LoginValidationService } from '../../services/login-validation.service';
@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrl: './login-page.component.css'
})
export class LoginPageComponent {
  constructor(private router: Router,private loginValidationService: LoginValidationService) {}
  username: string = '';
  password: string = '';
  loginFailed: boolean = false
  onSubmit(): void {
    if (this.loginValidationService.validate(this.username, this.password)) {
      this.router.navigate(['/home']);
    } else {
      // Invalid credentials, handle accordingly (show error message, etc.)
      this.loginFailed = true;
    }
  }

  registerAsCompany() {
    this.router.navigate(['/company-registeration']);
  }

  registerAsUser() {
    this.router.navigate(['/user-registeration']);
  }
}
