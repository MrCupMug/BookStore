import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl  } from '@angular/forms';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

import { AuthorsService } from 'src/app/authors/services/authors.service';
import { GenresService } from 'src/app/genres/services/genres.service';
import { BooksService } from '../../services/books.service';

@Component({
  selector: 'app-add-book',
  templateUrl: './add-book.component.html',
  styleUrls: ['./add-book.component.scss']
})
export class AddBookComponent implements OnInit {

  public nameFilteredOptions: Observable<string[]>;

  public genresFilteredOptions: Observable<string[]>;

  // public myControl = new FormControl();

  public nameOptions!: string[];

  public genresOptions!: string[];

  public bookForm: FormGroup = this.fb.group({
    title: [null, Validators.required],
    name: [null, Validators.required],
    price: [null, Validators.required],
    genres: [null, Validators.required],
    description: [null, Validators.required],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly authorsService: AuthorsService,
    private readonly genresService: GenresService,
    private readonly bookService: BooksService,
  ) { }


  ngOnInit() {

    this.authorsService.getAuthors().subscribe((value) => {
      value.authors.reduce((result, current) => {
        result.push((`${current.first_name} ${current.last_name}`));
        this.nameOptions = result;

        this.nameFilteredOptions = this.bookForm.get('name').valueChanges.pipe(
          startWith(''),
          map((value) => this._nameFilter(value))
        );

        return result;
      }, []);
    });

    this.genresService.getGenres().subscribe((value) => {
      value.genres.reduce((result, current) => {
        result.push(current.name);
        this.genresOptions = result;

        this.genresFilteredOptions = this.bookForm.get('genres').valueChanges.pipe(
          startWith(''),
          map((value) => this._genresFilter(value))
        );

        return result;
      }, []);
    });

  }

  public onSubmit(): void {

    this.authorsService.getAuthors().subscribe(el => {
      let test = el.authors.filter(data => {
        return data.first_name === this.bookForm.value.name.split(' ')[0];
      });

    //   console.log({
    //   title: this.bookForm.value.title,
    //   name: test[0].id,
    //   price: this.bookForm.value.price,
    //   genres: this.bookForm.value.genres,
    //   description: this.bookForm.value.description,
    // });

    this.bookService.addBook(this.bookForm.value, test);

    });

  }

  private _nameFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.nameOptions.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }

  private _genresFilter(value: string): string[] {
    const filterValue = value.toLowerCase();

    return this.genresOptions.filter(option =>
      option.toLowerCase().includes(filterValue)
    );
  }
}
