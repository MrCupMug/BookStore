import { Component, OnInit, Inject } from '@angular/core';

import { MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-windows',
  templateUrl: './dialog-windows.component.html',
  styleUrls: ['./dialog-windows.component.scss']
})
export class DialogWindowsComponent implements OnInit {

  constructor(
              @Inject(MAT_DIALOG_DATA) public data,
  ) { }

  ngOnInit() { }

}
