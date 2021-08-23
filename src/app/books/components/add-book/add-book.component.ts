import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators  } from '@angular/forms';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  bookForm: FormGroup = this.fb.group({
    title: [null, Validators.required],
    firstName: [null, Validators.required],
    lastName: [null, Validators.required],
    price: [null, Validators.required],
    genres: [null, Validators.required],
    description: [null, Validators.required],
  });

  constructor(
    private readonly fb: FormBuilder,
  ) { }

  ngOnInit() {
  }

  public onSubmit(): void {
    alert(this.bookForm.value.title);
  }

}
