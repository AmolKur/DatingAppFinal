import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/_services/user.service';
import { NotifyService } from 'src/_services/notify.service';
import { User } from '../../_models/User';


@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  users: User[];

  constructor(
    private userService: UserService,
    private notofy: NotifyService
  ) {}

  ngOnInit() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().subscribe(
      (usersFromService: User[]) => {
        this.users = usersFromService;
      },
      error => {
        this.notofy.error(error);
      }
    );
  }
}
