import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { FormBuilder, FormArray, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { GenresService } from 'src/app/genres/services/genres.service';

@Component({
  selector: 'app-genre-form',
  templateUrl: './genre-form.component.html',
  styleUrls: ['./genre-form.component.scss']
})
export class GenreFormComponent implements OnInit, OnDestroy {

  public destroy$ = new Subject<void>();

  public genresOptions: Record<null, object[]>;

  public genreForm = this.fb.group({
    genre: [null, Validators.required],
    alternativeGenres: this.fb.array([]),
  });

  public get alternativeGenres() {
    return this.genreForm.controls['alternativeGenres'] as FormArray;
  }

  public addAlternativeGenres(): void {
    const genre = this.fb.group({
      genre: [null, Validators.required],
    });

    this.alternativeGenres.push(genre);
  }

  constructor(
    private readonly fb: FormBuilder,
    private readonly genresService: GenresService,
  ) { }

  ngOnInit() {
    this.genreForm.get('genre').valueChanges
    .pipe(
      debounceTime(500),
      switchMap((genre) => {
        return this.genresService.getGenreByName(genre);
      }),
      takeUntil(this.destroy$),
    )
    .subscribe((genreObject: Record<string, object[]>) => {
      this.genresOptions = genreObject.genres;
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }

}
