import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { CompanyComponent } from './components/company/company.component';
const routes: Routes = [
  { path: 'user-profile', component: UserComponent },
  {path:'company-profile', component: CompanyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
