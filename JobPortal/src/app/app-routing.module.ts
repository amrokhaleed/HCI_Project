import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserComponent } from './components/user/user.component';
import { CompanyComponent } from './components/company/company.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UserRegisterationComponent } from './components/user-registeration/user-registeration.component';
import { CompanyRegisterationComponent } from './components/company-registeration/company-registeration.component';
import { HomeComponent } from './home/home.component';
import { JobApplyComponent } from './job-apply/job-apply.component';
const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' }, // Default route
  { path: 'home', component: HomeComponent },
  { path: 'user-profile', component: UserComponent },
  {path:'company-profile', component: CompanyComponent},
  {path:'login',component:LoginPageComponent},
  {path:'user-registeration',component:UserRegisterationComponent},
  {path:'company-registeration',component:CompanyRegisterationComponent},
  {path:'job-apply',component:JobApplyComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
