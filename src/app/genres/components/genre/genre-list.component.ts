import { Component, Input, OnInit } from '@angular/core';

import { Observable } from 'rxjs';

import { IGenre } from '../../interfaces/genres.interface';


@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss']
})
export class GenreListComponent implements OnInit {

  @Input()
  public genres$: Observable<IGenre[]>;

  constructor() { }

  public ngOnInit(): void {
  }

}
