import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/_services/user.service';
import { NotifyService } from 'src/_services/notify.service';
import { ActivatedRoute } from '@angular/router';
import { error } from 'util';
import { User } from 'src/app/_models/User';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.css']
})
export class MemberDetailComponent implements OnInit {
  user: User;

  constructor(private userService: UserService, private notify: NotifyService,
    private route: ActivatedRoute) { }

  ngOnInit() {
    this.loadUser();
  }

  loadUser() {
    this.userService.getUser(+this.route.snapshot.params['id']).subscribe(
      (returnedUser: User) => {
        this.user = returnedUser;
      },
      error => {
              this.notify.error(error);
      });
    }

}
