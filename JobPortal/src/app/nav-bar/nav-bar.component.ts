import { Component, OnInit, inject } from '@angular/core';
import { Input } from '@angular/core';
import { IsloggedService } from '../services/islogged.service';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  authservices = inject(AuthService)
  constructor(private Logged: IsloggedService,private router:Router){}
  logged:boolean = localStorage.getItem('dataSource') === "true";
  logout() {
    this.authservices.logout();
    this.router.navigateByUrl('/login', { skipLocationChange: true }).then(() => {
      this.router.navigate(['/home']);
  });
  }
  toHome() {
    this.router.navigate(["/user-profile"]);
  }

}