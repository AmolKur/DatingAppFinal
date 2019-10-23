import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatchesComponent } from './members/matches/matches.component';
import { MessagesComponent } from './messages/messages.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AuthGuard, AdminAuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';

export const appRoutes: Routes = [
 // { path: 'userlist', component: UserlistComponent, canActivate: [AdminAuthGuard]},
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers : 'always',
    canActivate : [AuthGuard],
    children: [
      { path: 'matches', component: MatchesComponent },
      { path: 'messages', component: MessagesComponent },
      { path: 'userlist', component: UserlistComponent },
      { path: 'userdetail/:id', component: MemberDetailComponent }
    ]
  },
  { path: '**', redirectTo : 'home', pathMatch: 'full' },
];


