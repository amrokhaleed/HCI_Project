import { provideFirebaseApp, getApp, initializeApp } from '@angular/fire/app';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CardHolderComponent } from './card-holder/card-holder.component';
import { SideFilterComponent } from './side-filter/side-filter.component';
import { JobCardComponent } from './job-card/job-card.component';
import { Location } from '@angular/common';
import { UserComponent } from './components/user/user.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyComponent } from './components/company/company.component';
import { LoginPageComponent } from './components/login-page/login-page.component';
import { UserRegisterationComponent } from './components/user-registeration/user-registeration.component';
import { CompanyRegisterationComponent } from './components/company-registeration/company-registeration.component';
import { HomeComponent } from './home/home.component';
import { JobDetailsPopupComponent } from './job-details-popup/job-details-popup.component';
import { JobApplyComponent } from './job-apply/job-apply.component';
import { faS, fas } from '@fortawesome/free-solid-svg-icons';

const firebaseConfig = {
  apiKey: "AIzaSyBqVCyrt5Wz8MKLgkekI6eajr21CzcpksI",
  authDomain: "jobportal-1ab76.firebaseapp.com",
  projectId: "jobportal-1ab76",
  storageBucket: "jobportal-1ab76.appspot.com",
  messagingSenderId: "244817505106",
  appId: "1:244817505106:web:bf338f0b8a698f39e5e88b"
};
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
    CompanyRegisterationComponent,
    HomeComponent,
    JobDetailsPopupComponent,
    JobApplyComponent
   ],
  imports: [
    provideFirebaseApp(() => initializeApp(firebaseConfig)),
    provideFirestore(() => getFirestore()),
    provideAuth(() => getAuth()),
    CommonModule,
    FormsModule,
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [
    provideClientHydration(),
    Location
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
