import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
//import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

import { Library } from '@fortawesome/fontawesome-svg-core';
import { faS } from '@fortawesome/free-solid-svg-icons';
import { faR } from '@fortawesome/free-solid-svg-icons';
//import { FaConfig } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CardHolderComponent } from './card-holder/card-holder.component';
import { SideFilterComponent } from './side-filter/side-filter.component';
import { JobCardComponent } from './job-card/job-card.component';

import { UserComponent } from './components/user/user.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyComponent } from './components/company/company.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UserRegisterationComponent } from './components/user-registeration/user-registeration.component';
import { CompanyRegisterationComponent } from './components/company-registeration/company-registeration.component';


@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SearchBarComponent,
    CardHolderComponent,
    SideFilterComponent,
    JobCardComponent,
    UserComponent,
    CompanyComponent,
    LoginPageComponent,
    UserRegisterationComponent,
    CompanyRegisterationComponent
   ],
  imports: [
    CommonModule,
    FormsModule,
    FontAwesomeModule,
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
