import { Component, OnInit, Inject } from '@angular/core';

import { MatDialog, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { AuthorsService } from 'src/app/authors/services/authors.service';
import { CardService } from 'src/app/card/services/card.service';

@Component({
  selector: 'app-dialog-windows',
  templateUrl: './dialog-windows.component.html',
  styleUrls: ['./dialog-windows.component.scss']
})
export class DialogWindowsComponent implements OnInit {

  constructor(
              @Inject(MAT_DIALOG_DATA) public data,
              private readonly dialog: MatDialog,
              private readonly authorsService: AuthorsService,
              private readonly cardService: CardService,
  ) { }

  ngOnInit() { }

  // public showAdditionalInfo(event: any): void {

  //   this.authorsService.getAuthor(event.id)
  //   .subscribe((data) => {
  //     this.dialog.open(DialogWindowsComponent, {
  //       data : {
  //         title: event.title,
  //         price: event.price,
  //         image: '../../../../assets/bookjpg',
  //         genre: this.getGenres(event),
  //         description: event.description,
  //         author: `${data.first_name} ${data.last_name}`,
  //       }
  //     });
  //   });
  // }

  // public getGenres(event: any) {
  //   event.genres.reduce((result, current: any) => {
  //     result += current.name + ' ';
  //     return result;
  //   }, '').trim();
  // }

}
