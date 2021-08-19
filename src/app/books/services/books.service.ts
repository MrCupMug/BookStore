import { Injectable } from '@angular/core';

import { IBooksCard } from '../interfaces/books-interface';

@Injectable({
  providedIn: 'root'
})
export class BooksService {

  public books: IBooksCard[] = [
    {
        "id": 1,
        "description": "Ruby inherited the Perl philosophy of having more than one way to do the same thing. I inherited that philosophy from Larry Wall, who is my hero actually. I want to make Ruby users free. I want to give them the freedom to choose.",
        "author_id": 1,
        "title": "Noli Me Tangere",
        "price": 670.0,
        "genres": [
            {
                "id": 15,
                "name": "Essay"
            },
            {
                "id": 9,
                "name": "Folklore"
            }
        ],
        "previews": [],
        "image": null,
        "writing_date": "2007-11-24T00:00:00.000Z",
        "release_date": "2012-11-12T00:00:00.000Z"
    },
    {
        "id": 2,
        "description": "You want to enjoy life, don't you? If you get your job done quickly and your job is fun, that's good isn't it? That's the purpose of life, partly. Your life is better.",
        "author_id": 1,
        "title": "The Other Side of Silence",
        "price": 1118.0,
        "genres": [
            {
                "id": 12,
                "name": "Short story"
            },
            {
                "id": 17,
                "name": "Comic/Graphic Novel"
            },
            {
                "id": 3,
                "name": "Speech"
            }
        ],
        "previews": [],
        "image": null,
        "writing_date": "2007-03-16T00:00:00.000Z",
        "release_date": "2012-04-19T00:00:00.000Z"
    },
    {
        "id": 3,
        "description": "The orthogonal features, when combined, can explode into complexity.",
        "author_id": 1,
        "title": "The Waste Land",
        "price": 2139.0,
        "genres": [
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
            }
        ],
        "previews": [],
        "image": null,
        "writing_date": "2007-02-10T00:00:00.000Z",
        "release_date": "2012-06-29T00:00:00.000Z"
    },
    {
        "id": 4,
        "description": "In our daily lives as programmers, we process text strings a lot. So I tried to work hard on text processing, namely the string class and regular expressions. Regular expressions are built into the language and are very tuned up for use.",
        "author_id": 2,
        "title": "Of Mice and Men",
        "price": 1631.0,
        "genres": [
            {
                "id": 11,
                "name": "Classic"
            },
            {
                "id": 14,
                "name": "Western"
            },
            {
                "id": 5,
                "name": "Reference book"
            }
        ],
        "previews": [],
        "image": null,
        "writing_date": "2007-03-28T00:00:00.000Z",
        "release_date": "2012-09-07T00:00:00.000Z"
    },
    {
        "id": 5,
        "description": "Because of the Turing completeness theory, everything one Turing-complete language can do can theoretically be done by another Turing-complete language, but at a different cost. You can do everything in assembler, but no one wants to program in assembler anymore.",
        "author_id": 2,
        "title": "Look to Windward",
        "price": 1260.0,
        "genres": [
            {
                "id": 17,
                "name": "Comic/Graphic Novel"
            }
        ],
        "previews": [],
        "image": null,
        "writing_date": "2007-04-19T00:00:00.000Z",
        "release_date": "2012-06-25T00:00:00.000Z"
    },
    {
        "id": 6,
        "description": "Man is driven to create; I know I really love to create things. And while I'm not good at painting, drawing, or music, I can write software.",
        "author_id": 2,
        "title": "Now Sleeps the Crimson Petal",
        "price": 2924.0,
        "genres": [
            {
                "id": 16,
                "name": "Fiction in verse"
            },
            {
                "id": 4,
                "name": "Fantasy"
            },
            {
                "id": 1,
                "name": "Fanfiction"
            }
        ],
        "previews": [],
        "image": null,
        "writing_date": "2007-10-10T00:00:00.000Z",
        "release_date": "2012-04-25T00:00:00.000Z"
    },
    {
        "id": 7,
        "description": "I hope to see Ruby help every programmer in the world to be productive, and to enjoy programming, and to be happy. That is the primary purpose of Ruby language.",
        "author_id": 2,
        "title": "Many Waters",
        "price": 2469.0,
        "genres": [
            {
                "id": 18,
                "name": "Humor"
            },
            {
                "id": 6,
                "name": "Realistic fiction"
            }
        ],
        "previews": [],
        "image": null,
        "writing_date": "2007-06-08T00:00:00.000Z",
        "release_date": "2012-04-14T00:00:00.000Z"
    },
    {
        "id": 8,
        "description": "It is not the responsibility of the language to force good looking code, but the language should make good looking code possible.",
        "author_id": 3,
        "title": "To Your Scattered Bodies Go",
        "price": 2176.0,
        "genres": [
            {
                "id": 17,
                "name": "Comic/Graphic Novel"
            },
            {
                "id": 15,
                "name": "Essay"
            },
            {
                "id": 1,
                "name": "Fanfiction"
            }
        ],
        "previews": [],
        "image": null,
        "writing_date": "2007-04-09T00:00:00.000Z",
        "release_date": "2012-07-30T00:00:00.000Z"
    },
    {
        "id": 9,
        "description": "From the viewpoint of what you can do, therefore, languages do differ - but the differences are limited. For example, Python and Ruby provide almost the same power to the programmer.",
        "author_id": 3,
        "title": "Waiting for the Barbarians",
        "price": 1805.0,
        "genres": [
            {
                "id": 7,
                "name": "Horror"
            },
            {
                "id": 19,
                "name": "Science fiction"
            }
        ],
        "previews": [],
        "image": null,
        "writing_date": "2007-02-11T00:00:00.000Z",
        "release_date": "2012-05-28T00:00:00.000Z"
    },
    {
        "id": 10,
        "description": "I didn't work hard to make Ruby perfect for everyone, because you feel differently from me. No language can be perfect for everyone. I tried to make Ruby perfect for me, but maybe it's not perfect for you. The perfect language for Guido van Rossum is probably Python.",
        "author_id": 3,
        "title": "Consider Phlebas",
        "price": 1669.0,
        "genres": [
            {
                "id": 15,
                "name": "Essay"
            },
            {
                "id": 13,
                "name": "Metafiction"
            },
            {
                "id": 2,
                "name": "Crime/Detective"
            }
        ],
        "previews": [],
        "image": null,
        "writing_date": "2007-06-15T00:00:00.000Z",
        "release_date": "2012-07-11T00:00:00.000Z"
    }
]

  constructor() { }

  public getBooks(): IBooksCard[] {
    return this.books;
  }
}
