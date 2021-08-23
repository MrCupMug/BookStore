import { Component, OnInit, OnDestroy } from '@angular/core';

import { GenresService } from '../services/genres.service';
import { IGenres } from '../interfaces/genres.interface';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit, OnDestroy {

  public genres: IGenres[] = [];

  private subscriptions: Array<any> = [];

  constructor(
              private readonly genresService: GenresService,
  ) { }

  ngOnInit() {
    this._loadGenres();
  }

  ngOnDestroy() {
    this.subscriptions.forEach((subscribtion) => {
      subscribtion.unsubscribe();
    });
  }

  private _loadGenres(): void {
    const request = this.genresService.getGenres()
      .subscribe((data) => {
        this.genres = data.genres;
      });

    this.subscriptions.push(request);

  }

}
