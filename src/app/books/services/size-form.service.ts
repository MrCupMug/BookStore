import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SizeFormService {

  public sizeValue: number;

  constructor() { }

  public convertToMeters(sizeValue: number, unitValue: string) {
    switch (unitValue) {
      case 'cm':
        this.sizeValue = sizeValue / 100;
        break;
      case 'dm':
        this.sizeValue = sizeValue / 10;
        break;
      case 'km':
        this.sizeValue = sizeValue * 1000;
        break;
    }
  }

  public convertToCentimeters(sizeValue: number, unitValue: string) {
    switch (unitValue) {
      case 'm':
        this.sizeValue = sizeValue * 100;
        break;
      case 'dm':
        this.sizeValue = sizeValue * 10;
        break;
      case 'km':
        this.sizeValue = sizeValue * 100000;
        break;
    }
  }

  public convertToDecimeters(sizeValue: number, unitValue: string) {
    switch (unitValue) {
      case 'm':
        this.sizeValue = sizeValue * 10;
        break;
      case 'cm':
        this.sizeValue = sizeValue / 10;
        break;
      case 'km':
        this.sizeValue = sizeValue * 10000;
        break;
    }
  }

  public convertToKilometers(sizeValue: number, unitValue: string) {
    switch (unitValue) {
      case 'm':
        this.sizeValue = sizeValue / 1000;
        break;
      case 'cm':
        this.sizeValue = sizeValue / 100000;
        break;
      case 'dm':
        this.sizeValue = sizeValue / 10000;
        break;
    }
  }

}
