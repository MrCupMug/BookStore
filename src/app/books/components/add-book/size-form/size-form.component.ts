import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-size-form',
  templateUrl: './size-form.component.html',
  styleUrls: ['./size-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SizeFormComponent),
      multi: true,
    }
  ]
})
export class SizeFormComponent implements OnInit, ControlValueAccessor {

  @Input()
  public unit;

  public sizeForm: FormControl;

  private _val;

  constructor() {}

  public get size() {
    return this.sizeForm;
  }

  ngOnInit() {
    this._initForm();
    this.size.setValue(this.unit.size);
  }

  public onChange: any = () => {};

  public onTouch: any = () => {};

  public set value(val) {
    if ( val !== undefined && this._val !== val) {
    this._val = val;
    this.onChange(val);
    this.onTouch(val);
    }
  }

  public writeValue(value: any) {
    this.value = value;
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  public changeValue(value: string): void {
    switch (this.unit.unit) {
      case 'm':
        this.convertToMeters(this.unit.size, value);
        break;
      case 'cm':
        this.convertToCentimeters(this.unit.size, value);
        break;
      case 'dm':
        this.convertToDecimeters(this.unit.size, value);
        break;
      case 'km':
        this.convertToKilometers(this.unit.size, value);
        break;
    }
  }

  private convertToMeters(sizeValue: number, unitValue: string) {

    const toMeters = sizeValue / 100;

    switch (unitValue) {
      case 'cm':
        this.size.setValue(this.unit.size);
        break;
      case 'dm':
        this.size.setValue(sizeValue / 10);
        break;
      case 'km':
        this.size.setValue(sizeValue / 100000);
        break;
      case 'm':
        this.size.setValue(sizeValue / 100);
    }

    this.value = toMeters;
  }

  private convertToCentimeters(sizeValue: number, unitValue: string) {

    const toCentimeters = sizeValue;

    switch (unitValue) {
      case 'cm':
        this.size.setValue(this.unit.size);
        break;
      case 'dm':
        this.size.setValue(sizeValue / 10);
        break;
      case 'km':
        this.size.setValue(sizeValue / 100000);
        break;
      case 'm':
        this.size.setValue(sizeValue / 100);
    }

    this.value = toCentimeters;
  }

  private convertToDecimeters(sizeValue: number, unitValue: string) {

    const toDecimeters = sizeValue / 10;

    switch (unitValue) {
      case 'cm':
        this.size.setValue(this.unit.size);
        break;
      case 'dm':
        this.size.setValue(sizeValue / 10);
        break;
      case 'km':
        this.size.setValue(sizeValue / 100000);
        break;
      case 'm':
        this.size.setValue(sizeValue / 100);
    }

    this.value = toDecimeters;

  }

  private convertToKilometers(sizeValue: number, unitValue: string) {

    const toKilometers = sizeValue / 100000;

    switch (unitValue) {
      case 'cm':
        this.size.setValue(this.unit.size);
        break;
      case 'dm':
        this.size.setValue(sizeValue / 10);
        break;
      case 'km':
        this.size.setValue(sizeValue / 100000);
        break;
      case 'm':
        this.size.setValue(sizeValue / 100);
    }

    this.value = toKilometers;
  }

  private _initForm() {
    this.sizeForm = new FormControl(null, Validators.required);
  }

}
