import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from '../_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from 'src/_services/error.intersepter';
import { NotifyService } from 'src/_services/notify.service';
import { MessagesComponent } from './messages/messages.component';
import { MatchesComponent } from './matches/matches.component';
import { UserlistComponent } from './userlist/userlist.component';
import { appRoutes } from './approute.routing';



@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MessagesComponent,
      MatchesComponent,
      UserlistComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      RouterModule.forRoot(appRoutes)
   ],
   providers: [
      AuthService,
      ErrorInterceptorProvider,
      NotifyService
   ],
   bootstrap: [
      AppComponent
   ]
})
export class AppModule { }
