import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import {COMMA, ENTER} from '@angular/cdk/keycodes';
import {MatChipInputEvent} from '@angular/material/chips';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';

export interface Genre {
  name: string;
}

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
  }
})
export class CustomGenreFormComponent implements OnInit, OnDestroy, MatFormFieldControl<any> {

  public stateChanges = new Subject<void>();

  public id = `app-custom-genre-form-${CustomGenreFormComponent.nextId++}`;

  visible = true;
  selectable = true;
  removable = true;
  addOnBlur = true;
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  genres: Genre[] = [
    {name: 'Lemon'},
    {name: 'Lime'},
    {name: 'Apple'},
  ];

  static nextId = 0;

  private _placeholder: string;

  constructor() { }

  @Input()
  get placeholder() {
    return this._placeholder;
  }
  set placeholder(plh) {
    this._placeholder = plh;
    this.stateChanges.next();
  }

  get value(): Genre[] {
    return this.genres;
  }

  set value(genres: any | null) {
    this.genres = genres;
    this.stateChanges.next();
  }

  add(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Add our fruit
    if ((value || '').trim()) {
      this.genres.push({name: value.trim()});
    }

    // Reset the input value
    if (input) {
      input.value = '';
    }
  }

  remove(fruit: Genre): void {
    const index = this.genres.indexOf(fruit);

    if (index >= 0) {
      this.genres.splice(index, 1);
    }
  }

  public ngOnInit(): void { }

  public ngOnDestroy(): void {
    this.stateChanges.complete();
  }

}
