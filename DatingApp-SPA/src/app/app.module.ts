import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { BsDropdownModule, TabsModule } from 'ngx-bootstrap';
import { RouterModule } from '@angular/router';
import { JwtModule } from '@auth0/angular-jwt';

import { AppComponent } from './app.component';
import { NavComponent } from './nav/nav.component';
import { AuthService } from '../_services/auth.service';
import { HomeComponent } from './home/home.component';
import { RegisterComponent } from './register/register.component';
import { ErrorInterceptorProvider } from 'src/_services/error.intersepter';
import { NotifyService } from 'src/_services/notify.service';
import { MessagesComponent } from './messages/messages.component';
import { MatchesComponent } from './members/matches/matches.component';
import { MemberCardComponent } from './members/member-card/member-card.component';
import { UserlistComponent } from './userlist/userlist.component';
import { appRoutes } from './approute.routing';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';


export function tokenGetter(){
   return localStorage.getItem('token');
}

@NgModule({
   declarations: [
      AppComponent,
      NavComponent,
      HomeComponent,
      RegisterComponent,
      MessagesComponent,
      MatchesComponent,
      UserlistComponent,
      MemberCardComponent,
      MemberDetailComponent
   ],
   imports: [
      BrowserModule,
      HttpClientModule,
      FormsModule,
      BsDropdownModule.forRoot(),
      TabsModule.forRoot(),
      RouterModule.forRoot(appRoutes),
      JwtModule.forRoot({
         config:{
            tokenGetter : tokenGetter,
            whitelistedDomains :['localhost:5000'] ,
            blacklistedRoutes : ['localhost:5000/api/auth'] ,

         }
      })
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
