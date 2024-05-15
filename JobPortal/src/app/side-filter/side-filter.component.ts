import { Component } from '@angular/core';
import { inject } from '@angular/core';
import { AccountsDataService } from '../services/accounts-data.service'; // Import the AccountsDataService service
import { Router } from '@angular/router'; // Import the Router service
@Component({
  selector: 'app-side-filter',
  templateUrl: './side-filter.component.html',
  styleUrl: './side-filter.component.css',
})
export class SideFilterComponent {
  accountData = inject(AccountsDataService);
  sideFilterUserType: string = ''; // Variable to store the user type
  constructor(private router: Router) {} // Inject the Router service
  ngOnInit() {
    this.sideFilterUserType = this.accountData.gettype();
    console.log(this.sideFilterUserType);
  }
  toAddJob() {
    this.router.navigate(['/add-job']);
  }
}
