import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';

import { MatToolbarModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { FormsModule } from '@angular/forms';

import { CardModule } from '../card/card.module';



@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    CardModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    FormsModule,
    RouterModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule { }
