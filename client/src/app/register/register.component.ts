import { Component, OnInit } from '@angular/core';
import { MessageService, Message } from 'primeng/api';
import {
  FormGroup,
  FormControl,
  Validators,
  ValidatorFn,
  AbstractControl,
  FormBuilder,
} from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { AccountService } from '../_services/account.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  constructor(
    private toastr: ToastrService,
    private fb: FormBuilder,
    private accountService: AccountService,
    private router: Router
  ) {}

  ngOnInit() {
    this.initializeForm();
  }

  initializeForm() {
    this.registerForm = this.fb.group({
      gender: ['male'],
      username: ['', Validators.required],
      knownAs: ['', Validators.required],
      dateOfBirth: ['', Validators.required],
      city: ['', Validators.required],
      country: ['', Validators.required],
      password: [
        '',
        [Validators.required, Validators.minLength(4), Validators.maxLength(8)],
      ],
      confirmPassword: [
        '',
        [Validators.required, this.matchValues('password')],
      ],
    });
    // When password changes, updae the value and validity
    this.registerForm.controls.password.valueChanges.subscribe(() => {
      this.registerForm.controls.confirmPassword.updateValueAndValidity();
    });
  }

  // matchValues(matchTo:string): ValidatorFn {
  //   return (control: AbstractControl): {[key:string]:any} | null => {
  //     const forbidden = control?.parent?.controls as any;
  //     return (forbidden){
  //       ? (control?.value === forbidden[matchTo]?.value) ? null : {isMatching: true}
  //       : null;
  //     }
  //     // return control?.value === control?.parent?.controls[matchTo].value ? null : {isMatching: true}
  //   }
  // }

  matchValues(matchTo: string): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const forbidden = control?.parent?.controls as any;
      return forbidden
        ? control?.value === forbidden[matchTo]?.value
          ? null
          : { isMatching: true }
        : null;
    };
  }

  register() {
    this.accountService.register(this.registerForm.value).subscribe(
      (response) => {
        this.toastr.success('Account Created Successfully');
        this.router.navigateByUrl('/members');
      },
      (error) => {
        this.toastr.error('Error Creating Account');
      }
    );
  }
  cancel() {
    console.log('I was cancelled!!!');
  }
}
