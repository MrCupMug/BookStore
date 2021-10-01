import { Directive } from '@angular/core';
import { AbstractControl, NG_VALIDATORS, ValidationErrors, Validator } from '@angular/forms';

@Directive({
  selector: '[appFlag]',
  providers: [
    {
      provide: NG_VALIDATORS,
      useExisting: FlagValidatorDirective,
      multi: true
    }
  ],
})
export class FlagValidatorDirective implements Validator {

  constructor() { }

  public validate(control: AbstractControl): ValidationErrors | null {
    if (control.value !== 'white') {
      return {invalidColor: true};
    }

    return null;
  }

}
