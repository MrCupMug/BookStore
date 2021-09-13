import { Component, OnInit, OnDestroy, Input, Optional, Self, ElementRef } from '@angular/core';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatFormFieldControl } from '@angular/material';
import { Observable, Subject } from 'rxjs';
import { ControlValueAccessor, FormControl, NgControl, Validators } from '@angular/forms';
import { debounceTime, switchMap, takeUntil } from 'rxjs/operators';
import { IGenre } from 'src/app/genres/interfaces/genres.interface';
import { FocusMonitor } from '@angular/cdk/a11y';

@Component({
  selector: 'app-custom-genre-form',
  templateUrl: './custom-genre-form.component.html',
  styleUrls: ['./custom-genre-form.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: CustomGenreFormComponent,
    },
  ],
  host: {
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
    '[class.example-floating]': 'shouldLabelFloat',
  }
})
export class CustomGenreFormComponent implements OnInit, OnDestroy, MatFormFieldControl<IGenre[]>, ControlValueAccessor {

  @Input()
  fetchFn!: (text: string) => Observable<IGenre[]>;

  public genreForm: FormControl;

  public genreOptions: IGenre[];

  public genres: IGenre[] = [];

  public destroy$ = new Subject<void>();

  // Dunno why th I need it to be here
  public stateChanges = new Subject<void>();

  // Dunno why th I need it to be here
  public id = `app-custom-genre-form-${CustomGenreFormComponent.nextId++}`;

  // Variables for chips
  // public visible = true;
  public selectable = true;
  public removable = true;
  // public addOnBlur = true;
  public readonly separatorKeysCodes: number[] = [ENTER, COMMA];

  public focused = false;
  public required: boolean;
  public disabled: boolean;
  public errorState = false;
  public controlType = 'app-custom-genre-form';

  public describedBy = '';

  static nextId = 0;

  private _placeholder: string;

  constructor(
    @Optional() @Self() public ngControl: NgControl,
    private fm: FocusMonitor,
    private elRef: ElementRef<HTMLElement>
  ) {
      this.ngControl.valueAccessor = this;

      fm.monitor(elRef.nativeElement, true)
        .pipe(
          takeUntil(this.destroy$),
        )
        .subscribe(origin => {
          this.focused = !!origin;
          this.stateChanges.next();
        });
    }

    get empty(): boolean {
      return !this.genreForm.value;
    }

    get shouldLabelFloat(): boolean {
      return this.focused || !this.empty || !!this.genres.length;
    }
    
    @Input()
    get placeholder(): string {
      return this._placeholder;
    }
    set placeholder(placeholder: string) {
      this._placeholder = placeholder;
      this.stateChanges.next();
    }

    @Input()
    get value(): IGenre[] {
      return this.genres;
    }
    set value(genres: IGenre[] | null) {
      this.genres = genres;
      // this.`stateChanges`.next();
    }

  public ngOnInit(): void {
    this._initForm();
    this._listenGenresChange();
   }

  public ngOnDestroy(): void {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef.nativeElement);
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onChange: any = (value) => {};

  public onTouch: any = () => {};

  public writeValue(value: any): void {
    this.genres = [...value];
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDescribedByIds(ids: string[]): void {
    this.describedBy = ids.join(' ');
  }

  onContainerClick(event: MouseEvent): void {}

  remove(genre: IGenre): void {
    const index = this.genres.indexOf(genre);

    if (index >= 0) {
      this.genres.splice(index, 1);
    }

    this.onChange(this.genres);
  }

  public addGenre(genre: IGenre): void {
    if (this.genres.indexOf(genre) >= 0) {
      return;
    }
    this.genres.push(genre);
    this.onChange(this.genres);
  }

  private _initForm(): void {
    this.genreForm = new FormControl(null, Validators.required);
  }

  private _listenGenresChange(): void {
    this.genreForm.valueChanges
      .pipe(
        debounceTime(300),
        switchMap((value) => {
          return this.fetchFn(value);
        }),
        takeUntil(this.destroy$),
      )
      .subscribe((genres: IGenre[]) => {
        this.genreOptions = genres;
      });
  }

}
