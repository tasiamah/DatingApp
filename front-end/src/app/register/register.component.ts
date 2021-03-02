import {Component, Input, OnInit, EventEmitter, Output} from '@angular/core';
import {AccountService} from "../_services/account.service";
import {ToastrService} from "ngx-toastr";
import {FormControl, FormGroup, ValidatorFn, Validators} from "@angular/forms";

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  model: any = {};
  registerForm: FormGroup;
  @Output() cancelRegister = new EventEmitter();

  constructor(private accountService: AccountService, private toastr: ToastrService) {
  }

  ngOnInit(): void {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = new FormGroup({
      username: new FormControl('Hello', Validators.required),
      password: new FormControl('',
        [Validators.required,
          Validators.minLength(4),
          Validators.maxLength(8)]),
      confirmPassword: new FormControl('',
        [Validators.required,
          this.matchValues('password')])
    });
  }

  register() {
    console.log(this.registerForm.value);
    // this.accountService.register(this.model).subscribe(response => {
    //     console.log(response);
    //     this.cancel();
    // }, error => {
    //   console.log(error);
    //   this.toastr.error(error.error);
    //   });
  }

  matchValues(matchTo: string): ValidatorFn {
    return (control) => {
      return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true};
    };
  }

  cancel() {
    this.cancelRegister.emit(false);
  }
}
