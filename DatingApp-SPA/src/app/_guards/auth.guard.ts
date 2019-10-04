import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from 'src/_services/auth.service';
import { NotifyService } from 'src/_services/notify.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private alertyfy: NotifyService) {}
  canActivate(): boolean {
    if (this.authService.loggedIn()) {
      return true;
    }
    this.alertyfy.error('You are not authorized to this module');
    this.router.navigate(['/home']);
  }
}
@Injectable({
  providedIn: 'root'
})
export class AdminAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router, private alertyfy: NotifyService) {}
  canActivate(): boolean {
    if (this.authService.loggedIn() && this.authService.decodedToken.nameid[1] === 'pihu') {
      return true;
    }
    this.alertyfy.error('You are not authorized to this module as Admin');
    this.router.navigate(['/']);
  }
}
