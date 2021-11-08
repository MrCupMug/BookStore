import { ChangeDetectionStrategy, Component, Input } from '@angular/core';

import { IGenre } from '../../interfaces/genres.interface';


@Component({
  selector: 'app-genre-list',
  templateUrl: './genre-list.component.html',
  styleUrls: ['./genre-list.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class GenreListComponent {

  @Input()
  public genres: IGenre[];

  constructor() { }

}
