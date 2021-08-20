import { Injectable } from '@angular/core';

import { IAuthors } from '../interfaces/authors.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthorsService {

  public authors: IAuthors[] = [
    {
        "id": 1,
        "first_name": "Gus",
        "last_name": "Bahringer"
    },
    {
        "id": 2,
        "first_name": "Tyron",
        "last_name": "Bartell"
    },
    {
        "id": 3,
        "first_name": "Leeann",
        "last_name": "Mertz"
    },
    {
        "id": 4,
        "first_name": "Nan",
        "last_name": "Muller"
    },
    {
        "id": 5,
        "first_name": "Eulah",
        "last_name": "Collier"
    },
    {
        "id": 6,
        "first_name": "Nathaniel",
        "last_name": "Blick"
    },
    {
        "id": 7,
        "first_name": "Clinton",
        "last_name": "Hayes"
    },
    {
        "id": 8,
        "first_name": "Shawn",
        "last_name": "Lindgren"
    },
    {
        "id": 9,
        "first_name": "Hilda",
        "last_name": "Schinner"
    },
    {
        "id": 10,
        "first_name": "Marlana",
        "last_name": "Corwin"
    }
]

  constructor() { }

    public getAuthors(): IAuthors[] {
        return this.authors;
    }

    public getAuthor(authorId: number) {
        return this.authors.find(({id}) => id === authorId)
    }

}
