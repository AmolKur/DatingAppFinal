import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  @Input() valuesFromHome: any;
  model: any =  {};
  constructor() { }

  ngOnInit() {
  }

  register() {
    console.log('registered');
  }

  cancel() {
    console.log('canceled');
  }

}
