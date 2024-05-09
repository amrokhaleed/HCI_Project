import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { CardHolderComponent } from './card-holder/card-holder.component';
import { SideFilterComponent } from './side-filter/side-filter.component';
import { JobCardComponent } from './job-card/job-card.component';

@NgModule({
  declarations: [
    AppComponent,
    NavBarComponent,
    SearchBarComponent,
    CardHolderComponent,
    SideFilterComponent,
    JobCardComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
