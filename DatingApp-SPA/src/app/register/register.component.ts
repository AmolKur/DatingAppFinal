import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/_services/auth.service';
import { NotifyService } from 'src/_services/notify.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  model: any =  {};
  constructor(private authservice: AuthService, private alertService: NotifyService ) { }

  ngOnInit() {
  }

  register() {
    this.authservice.register(this.model).subscribe(() => {
      this.alertService.success('register successfull');
      this.cancelRegister.emit(false);
    }, error => {
      this.alertService.error(error);
    });
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.alertService.message('Cancelled');
  }

}
