import { AbstractControl, ValidatorFn, ValidationErrors } from '@angular/forms';

export function titleValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        if (!control.value || control.value?.length < 5) {
            return {invalidTitle: true};
        }

        return null;
    };
}
