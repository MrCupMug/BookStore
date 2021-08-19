import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LayoutComponent } from './components/layout.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MatToolbarModule } from '@angular/material';
import { MatIconModule } from '@angular/material';
import { MatSidenavModule } from '@angular/material';
import { FormsModule } from '@angular/forms';



@NgModule({
  declarations: [LayoutComponent],
  imports: [
    CommonModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatIconModule,
    MatSidenavModule,
    FormsModule,
  ],
  exports: [LayoutComponent],
})
export class LayoutModule { }
