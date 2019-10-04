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
  constructor(public authService: AuthService , private alertService: NotifyService) { }

  ngOnInit() {
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
    this.alertService.message('Logged out');
  }

}
