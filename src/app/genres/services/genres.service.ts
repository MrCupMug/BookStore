import { Injectable } from '@angular/core';

import { IGenres } from '../interfaces/genres-interface';

@Injectable({
  providedIn: 'root'
})
export class GenresService {

  public genres: IGenres[] = [
    {
        "id": 1,
        "name": "Fanfiction"
    },
    {
        "id": 2,
        "name": "Crime/Detective"
    },
    {
        "id": 3,
        "name": "Speech"
    },
    {
        "id": 4,
        "name": "Fantasy"
    },
    {
        "id": 5,
        "name": "Reference book"
    },
    {
        "id": 6,
        "name": "Realistic fiction"
    },
    {
        "id": 7,
        "name": "Horror"
    },
    {
        "id": 8,
        "name": "Legend"
    },
    {
        "id": 9,
        "name": "Folklore"
    },
    {
        "id": 10,
        "name": "Historical fiction"
    }
]

  constructor() { }

    public getGenres(): IGenres[] {
        return this.genres;
    }

}
