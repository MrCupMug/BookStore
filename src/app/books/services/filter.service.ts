import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, ValidationErrors, ValidatorFn } from '@angular/forms';

@Injectable()
export class FilterService {

  public filter = this._fb.group({
    author: [null],
    genre: [null],
    price: this._fb.group({
      minPrice: [null],
      maxPrice: [null],
    }, {validators: this._priceValidator()})
  });

  constructor(
    private readonly _fb: FormBuilder) { }

    public get filterForm(): FormGroup {
      return this.filter;
    }

    private _priceValidator(): ValidatorFn {
      return (group: FormGroup): ValidationErrors | null => {

        const minPrice = group.get('minPrice');
        const maxPrice = group.get('maxPrice');

        if ( maxPrice.value && minPrice.value > maxPrice.value ) {
          return {invalidPrice: 'invalid price filter', isValid: true};
        }

        return null;
      };
    }
}
