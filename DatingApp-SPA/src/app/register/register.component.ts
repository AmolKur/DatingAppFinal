import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AuthService } from 'src/_services/auth.service';
import { NotifyService } from 'src/_services/notify.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { BsDatepickerConfig } from 'ngx-bootstrap';
import { User } from '../_models/User';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  // @Input() valuesFromHome: any;
  @Output() cancelRegister = new EventEmitter();
  user: User;
  registerForm: FormGroup;
  bsconfig: Partial<BsDatepickerConfig>;
  constructor(private authservice: AuthService, private router: Router,
    private alertService: NotifyService, private fb: FormBuilder ) { }

  ngOnInit() {
    /* this.registerForm = new FormGroup({
      username: new FormControl('', Validators.required),
      password: new FormControl('', [Validators.required, Validators.minLength(4),
        Validators.maxLength(8)]),
      confirmPassword: new FormControl('', Validators.required)
    }, this.passwordMatchValidator); */
    this.bsconfig = {containerClass: 'theme-red'};
    this.createRegisterForm();
  }
  createRegisterForm() {
    this.registerForm = this.fb.group({
      gender : ['male'],
      username : ['', Validators.required],
      knownAs : ['', Validators.required],
      dateOfBirth : [null, Validators.required],
      city : ['', Validators.required],
      country : ['', Validators.required],
      password : ['', [ Validators.required, Validators.maxLength(8), Validators.minLength(4)]],
      confirmPassword : ['', Validators.required]
    }, {validator: this.passwordMatchValidator});
  }

  passwordMatchValidator(g: FormGroup){
    return g.get('password').value === g.get('confirmPassword').value ? null : {'mismatch': true};
  }

  register() {
    if(this.registerForm.valid){
      this.user = Object.assign({}, this.registerForm.value);
      this.authservice.register(this.user).subscribe(() => {
        this.alertService.success('register successfull');
      }, error => {
        this.alertService.error(error);
      }, () => {
        this.authservice.login(this.user).subscribe( () => {
          this.router.navigate(['/matches']);
        });
      });

    }
    /* this.authservice.register(this.model).subscribe(() => {
      this.alertService.success('register successfull');
      this.cancelRegister.emit(false);
    }, error => {
      this.alertService.error(error);
    }); */
console.log(this.registerForm.value);
  }

  cancel() {
    this.cancelRegister.emit(false);
    this.alertService.message('Cancelled');
  }

}
