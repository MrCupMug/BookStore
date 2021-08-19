import { Component, OnInit, Input } from '@angular/core';

import { IBooksCard } from 'src/app/books/interfaces/books-interface';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.scss']
})
export class CardComponent implements OnInit {

  @Input() public book!: IBooksCard;

  constructor() { }

  ngOnInit() {
  }

}
