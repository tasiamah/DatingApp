import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  @Input() usersFromHomeComponent;
  @Output() cancelRegister = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
  }

  register() {
    console.log(this.model);
  }
  cancel() {
    this.cancelRegister.emit(false);
  }
}