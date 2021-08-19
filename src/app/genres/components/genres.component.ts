import { Component, OnInit } from '@angular/core';

import { GenresService } from '../services/genres.service';
import { IGenres } from '../interfaces/genres-interface';

@Component({
  selector: 'app-genres',
  templateUrl: './genres.component.html',
  styleUrls: ['./genres.component.scss']
})
export class GenresComponent implements OnInit {

  public genres: IGenres[] = this.genresService.getGenres();

  constructor(
              private readonly genresService: GenresService,
  ) { }

  ngOnInit() {
  }

  

}
