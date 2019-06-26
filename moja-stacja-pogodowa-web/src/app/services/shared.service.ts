import { Injectable } from '@angular/core';
import { AbstractControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { BehaviorSubject, Subject } from 'rxjs';

@Injectable()
export class SharedService {
  // sendButton: Subject<boolean> = new Subject<boolean>();
  showButton: Subject<boolean> = new Subject<boolean>();
  // showing elements Subjects
  showSurveyDialog: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(
    false
  );
  showCreator: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  showAdminMenu: Subject<boolean> = new Subject<boolean>();
  showUserInfo: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  // states
  savedTitle: string;
  // input error variable
  controlArray: string[];

  constructor(private router: Router) {}

  saveTitle(title: string): void {
    this.savedTitle = title;
  }

  // showing elements

  showCreatorButton(x: boolean): void {
    this.showCreator.next(x);
  }

  showAdminMain(x: boolean): void {
    this.showAdminMenu.next(x);
  }

  showUser(x: boolean): void {
    this.showUserInfo.next(x);
  }

  inputError(control: AbstractControl) {
    // retrieve controls names into array to show errors for user
    if (control.touched === true || control.dirty === true) {
      const parent = control.parent;
      if (
        parent instanceof FormGroup &&
        control.errors !== null &&
        control.touched
      ) {
        let controlName: string;

        const controls = parent.controls;
        if (!this.controlArray) {
          this.controlArray = Object.keys(controls);
        }
        const length = this.controlArray.length;

        for (let i = 0; i < length; i++) {
          if (control === controls[this.controlArray[i]]) {
            controlName = this.controlArray[i];
            break;
          }
        }
        const translatedControlName = this.controlNameAdjustSwitch(controlName);
        return this.setErrorString(control, controlName, translatedControlName);
      }
    }
  }
  controlNameAdjustSwitch(controlName: string): string {
    switch (controlName) {
      case 'name':
        controlName = 'imię';
        break;
      case 'password':
        controlName = 'hasło';
        break;
      case 'oldPassword':
        controlName = 'stare hasło';
        break;
      case 'newPassword':
        controlName = 'nowe hasło';
        break;
      case 'email':
        controlName = 'email';
        break;
    }
    return controlName;
  }
  setErrorString(
    control: AbstractControl,
    controlName: string,
    translatedControlName: string
  ) {
    let errorObj: {
      controlName: string;
      errorStr: string;
    };
    let errorStr: string;
    if (control.value !== undefined && control.value.length === 0) {
      errorStr = 'Wpisz ' + translatedControlName;
    } else {
      if (controlName === 'password' || controlName === 'newPassword') {
        errorStr =
          // tslint:disable-next-line:max-line-length
          'Użyj co najmniej ośmiu znaków, w tym jednocześnie liter, cyfr i symboli: !#$%&?';
      } else {
        errorStr = translatedControlName;
      }
    }
    errorObj = {
      errorStr,
      controlName
    };
    return errorObj;
  }
  deleteControlArray() {
    this.controlArray = undefined;
  }
}
