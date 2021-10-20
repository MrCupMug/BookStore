import { Injectable } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { titleValidator } from '../validators/title-validator';


@Injectable()
export class FormService {

  public bookForm = this.fb.group({
    title: [null, titleValidator()],
    price: [null, Validators.required],
    genre: [null, Validators.required],
    description: [null, Validators.required],
    author: [null, Validators.required],
  });

  constructor(
    private readonly fb: FormBuilder,
  ) { }

    public loadForm(): FormGroup {
      return this.bookForm;
    }

}
