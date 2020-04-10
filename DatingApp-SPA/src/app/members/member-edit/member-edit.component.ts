import { Component, OnInit, ViewChild, HostListener } from '@angular/core';
import { NotifyService } from 'src/_services/notify.service';
import { User } from 'src/app/_models/User';
import { ActivatedRoute } from '@angular/router';
import { NgForm } from '@angular/forms';
import { UserService } from 'src/_services/user.service';
import { error } from 'util';
import { AuthService } from 'src/_services/auth.service';

@Component({
  selector: 'app-member-edit',
  templateUrl: './member-edit.component.html',
  styleUrls: ['./member-edit.component.css']
})
export class MemberEditComponent implements OnInit {
  @ViewChild('editForm') editForm: NgForm;
  user: User;
  photoUrl: string;
  @HostListener('window:beforeunload', ['$event'])
  unloadNotification($event: any) {
    if (this.editForm.dirty) {
      $event.returnValue = true;
    }
  }

  constructor(private route: ActivatedRoute, private notify: NotifyService,
             private userService: UserService,private authService: AuthService) { }

  ngOnInit() {
    this.route.data.subscribe(data => {this.user = data['user']; });
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl);
  }

  updateUser() {
    this.userService.updateUser(this.user.id, this.user).subscribe(data => {
      this.notify.success('Changes saved successfully.');
      console.log(this.user);
      this.editForm.reset(this.user);
    }, error=> {
        this.notify.error(error);
      });
  }

  updateMainPhoto(photourl: string){
    this.user.mainPhotoUrl = photourl;
    this.authService.userOnLogin.mainPhotoUrl = photourl;
    localStorage.setItem('user', JSON.stringify(this.authService.userOnLogin));
  }
}
