import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NotifyService } from 'src/_services/notify.service';
import { User } from 'src/app/_models/User';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/_services/user.service';
import { error } from 'util';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private notify: NotifyService,
             private userService: UserService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {this.user = data['user'];
    });
  }

  updateUser() {

    this.userService.updateUser(this.user.id, this.user).subscribe(data => {
      this.notify.success('Changes saved successfully.');
      this.editForm.reset(this.user);
    },
      error => {
        this.notify.error(error);
      });
  }
}
