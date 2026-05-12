import { AbstractControl } from '@angular/forms';

export function emailValidator(control: AbstractControl) {
  if(!control.value) return null;
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const valid = emailPattern.test(control.value);
  return valid ? null : { invalidEmail: true };
}
