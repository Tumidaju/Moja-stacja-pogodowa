import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  NgForm,
  Validators
} from '@angular/forms';
import { Router } from '@angular/router';
import { SharedService } from '../../services/shared.service';
import { AccountService } from '../services/account.service';
import { AuthenticationService } from '../services/authentication.service';
import { first } from 'rxjs/operators';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss']
  // animations: [profilesTransition]
})
export class RegisterComponent implements OnInit, OnDestroy {
  // @HostBinding('@profilesTransition')
  // profilesTransition;

  // declare form
  regForm: FormGroup;
  name: AbstractControl;
  email: AbstractControl;
  password: AbstractControl;
  confirmPassword: AbstractControl;

  // error handlers
  nameErrorStr: string;
  emailErrorStr: string;
  passwordErrorStr: string;
  passwordConfirmErrorStr: string;
  registrationError = false;
  registrationErrorMessage: string[];

  // loader
  loading = false;

  // tslint:disable-next-line:max-line-length
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  passwordPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&]{8,}/;
  namePattern = /^([a-zA-ZąęćłóśźżĄĘĆŁÓŚŹŻ\\']){0,}$/;
  surnamePattern = /^([a-zA-ZąęćłóśźżĄĘĆŁÓŚŹŻ]+[\s\-\\'])*[a-zA-ZąęćłóśźżĄĘĆŁÓŚŹŻ]+$/;

  constructor(
    private fb: FormBuilder,
    private router: Router,
    private accountService: AccountService,
    private sharedService: SharedService,
    private authService: AuthenticationService
  ) {}

  ngOnDestroy() {
    this.sharedService.deleteControlArray();
  }
  ngOnInit() {
    // reset login status
    this.authService.logout();

    // form declaration
    this.regForm = this.fb.group({
      name: [
        '',
        Validators.compose([
          Validators.required,
          // Validators.pattern(this.namePattern)
        ])
      ],
      email: [
        '',
        Validators.compose([
          Validators.required,
          // Validators.pattern(this.emailPattern)
        ])
      ],
      password: [
        '',
        Validators.compose([
          Validators.required,
          // Validators.pattern(this.passwordPattern)
        ])
      ],
      confirmPassword: [
        '',
        Validators.compose([Validators.required, this.matchPassword])
      ]
    });

    // connecting controls with form inputs
    this.name = this.regForm.controls.name;
    this.email = this.regForm.controls.email;
    this.password = this.regForm.controls.password;
    this.confirmPassword = this.regForm.controls.confirmPassword;
  }

  onSubmit(form: NgForm): void {
    if (!form.valid) {
      // showing possible errors
      this.setAllAsTouched();
    } else {
      this.loading = true;
      this.accountService
        .register(this.regForm.getRawValue())
        .pipe(first())
        .subscribe((res: any) => {
          this.router.navigateByUrl('/auth/login');
        });
      // this.createUser();
      // create new user
      // switch (this.profileName.value) {
      //   case 'Student':
      //     this.accountService.createStudent(this.user).subscribe(
      //       data => {
      //         this.router.navigateByUrl('/auth/login');
      //       },
      //       error => {
      //         this.loading = false;
      //         this.registrationError = true;
      //         // set error message from api to loginErrorMessage
      //         console.log(error.error);
      //         this.registrationErrorMessage = error;
      //       }
      //     );
      //     break;
      // }
    }
  }

  setAllAsTouched(): void {
    this.name.markAsTouched();
    this.email.markAsTouched();
    this.password.markAsTouched();
    this.confirmPassword.markAsTouched();
  }
  setAllAsUntouched(): void {
    this.name.markAsUntouched();
    this.email.markAsUntouched();
    this.password.markAsUntouched();
    this.confirmPassword.markAsUntouched();
  }

  onFocus(control: AbstractControl): void {
    control.markAsUntouched();
    this.registrationError = false;
  }

  onBlur(control: AbstractControl): void {
    // hide possible errors
    if (!control.dirty) {
      control.markAsUntouched();
      this.registrationError = false;
    }
  }

  clearPasswordConfirm(): void {
    // clear confirm password input after changing password input
    this.confirmPassword.setValue('');
    this.confirmPassword.markAsUntouched();
  }

  matchPassword(control: AbstractControl): { [s: string]: boolean } {
    // check if inputs have same values
    if (control.parent !== undefined) {
      const password = control.parent.get('password').value;
      const passwordConfirm = control.parent.get('confirmPassword').value;
      if (password !== passwordConfirm) {
        return { noMatch: true };
      }
    }
  }

  inputError(control: AbstractControl): boolean {
    // get error message and control name in string
    const errorObj = this.sharedService.inputError(control);

    // assign error to input
    if (errorObj) {
      switch (errorObj.controlName) {
        case 'name':
          this.nameErrorStr = errorObj.errorStr;
          break;
        case 'email':
          this.emailErrorStr = errorObj.errorStr;
          break;
        case 'password':
          this.passwordErrorStr = errorObj.errorStr;
          break;
      }
      return true;
    }
  }

  passwordNoMatch(): boolean {
    if (this.confirmPassword.errors) {
      if (this.confirmPassword.errors.noMatch === undefined) {
        this.passwordConfirmErrorStr = 'Passwords do not match';
        return true;
      }
    } else {
      return false;
    }
  }
}
