import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { AuthService } from 'src/_services/auth.service';
import { User } from './_models/User';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit{
  jwtHelper = new JwtHelperService();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
  const token = localStorage.getItem('token');
  const userOnLogin: User = JSON.parse(localStorage.getItem('user'));
  if (token) {
    this.authService.decodedToken = this.jwtHelper.decodeToken(token);
  }
  if (userOnLogin) {
    this.authService.userOnLogin = userOnLogin;
    this.authService.changeMemberPhoto(userOnLogin.mainPhotoUrl);
  }
  }
}
