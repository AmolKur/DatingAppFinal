import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/_services/user.service';
import { NotifyService } from 'src/_services/notify.service';
import { User } from '../../_models/User';
import { ActivatedRoute } from '@angular/router';


@Component({
  selector: 'app-matches',
  templateUrl: './matches.component.html',
  styleUrls: ['./matches.component.css']
})
export class MatchesComponent implements OnInit {
  users: User[];

  constructor(
    private userService: UserService,
    private notofy: NotifyService,
    private route: ActivatedRoute
  ) {}

  ngOnInit() {
    //this.loadUsers(); added resolver
    this.route.data.subscribe(data => {
      this.users = data['users'];
    });
  }

  /*loadUsers() {
    this.userService.getUsers().subscribe(
      (usersFromService: User[]) => {
        this.users = usersFromService;
      },
      error => {
        this.notofy.error(error);
      }
    );
  }*/
}
