import { Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { MatchesComponent } from './members/matches/matches.component';
import { MessagesComponent } from './messages/messages.component';
import { UserlistComponent } from './userlist/userlist.component';
import { AuthGuard, AdminAuthGuard } from './_guards/auth.guard';
import { MemberDetailComponent } from './members/member-detail/member-detail.component';
import { MembrDetailResolver } from './_resolver/membr-detail.resolver';
import { MembrListResolver } from './_resolver/member-list.resolver';
import { MemberEditComponent } from './members/member-edit/member-edit.component';
import { MembrEditResolver } from './_resolver/membr-edit.resolver';
import { PreventUnsavedChanges } from './_guards/prevent-unsaved-changes.guard';

export const appRoutes: Routes = [
 // { path: 'userlist', component: UserlistComponent, canActivate: [AdminAuthGuard]},
  { path: '', component: HomeComponent },
  {
    path: '',
    runGuardsAndResolvers : 'always',
    canActivate : [AuthGuard],
    children: [
      { path: 'matches', component: MatchesComponent,
              resolve:{users:MembrListResolver} },
      { path: 'messages', component: MessagesComponent },
      { path: 'userlist', component: UserlistComponent },
      { path: 'userdetail/:id', component: MemberDetailComponent,
              resolve:{user: MembrDetailResolver} },
      { path: 'member/edit', component: MemberEditComponent,
              resolve:{user:MembrEditResolver},
              canDeactivate:[PreventUnsavedChanges]}
    ]
  },
  { path: '**', redirectTo : 'home', pathMatch: 'full' },
];


