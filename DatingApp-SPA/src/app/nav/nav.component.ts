import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../_services/auth.service';
import { NotifyService } from 'src/_services/notify.service';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  model: any = {};
  photoUrl: string;


  constructor(public authService: AuthService , private alertService: NotifyService) { }

  ngOnInit() {
    this.authService.currentPhotoUrl.subscribe(photoUrl => this.photoUrl = photoUrl); 
  }

  login() {
    this.authService.login(this.model).subscribe(next => {
       this.alertService.success('Login completed');
    }, error => {
      this.alertService.error('Login failed');
      console.log('Login failed');
      this.alertService.error(error);
    });
  }

  loggedIn() {
    return this.authService.loggedIn();
  }

  loggedOut() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    this.authService.decodedToken = null;
    this.authService.userOnLogin = null;
    this.alertService.message('Logged out');
  }

}
