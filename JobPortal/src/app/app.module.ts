import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { Library } from '@fortawesome/fontawesome-svg-core';
import { faS } from '@fortawesome/free-solid-svg-icons';
import { faR } from '@fortawesome/free-solid-svg-icons';
import { FaConfig } from '@fortawesome/angular-fontawesome';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserComponent } from './components/user/user.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CompanyComponent } from './components/company/company.component';
import { LoginPageComponent } from './components/login-page/login-page.component';

@NgModule({
  declarations: [
    AppComponent,
    UserComponent,
    CompanyComponent,
    LoginPageComponent
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
