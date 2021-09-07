import { Component, forwardRef, OnInit, Input } from '@angular/core';
import { ControlValueAccessor, FormBuilder, FormControl, FormGroup, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

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
  public unit: any;
  // public unit: 'cm' | 'm' | 'dm' | 'km';

  public sizeForm: FormGroup;

  public unitValue: string;

  private _val;

  constructor(
    private readonly fb: FormBuilder,
  ) {}

  public get size() {
    return this.sizeForm;
  }

  ngOnInit() {
    this.unitValue = this.unit.value;
    this.writeValue(this.unit.size);
    this._initForm();

    this.size.get('unit').valueChanges
      .subscribe((unit) => {
        this.unitValue = unit;
        this.writeValue(this.unit.size);
      })
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
    value = this.convertValue(value);
    this._val = value;
  }

  public registerOnChange(fn: any) {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any) {
    this.onTouch = fn;
  }

  public convertValue(value: number) {
    console.log('convert');
    switch(this.unitValue) {
      case 'm':
        value = value / 100;
        break;
      case 'cm':
        value = this.unit.size;
        break;
      case 'dm':
        value = value / 10;
        break;
      case 'km':
        value / 100000;
        break;
    }

    return value;
  }

  public changeValue(): void {
    switch (this.unit.unit) {
      case 'm':
        this.convertToMeters(this.unit.size, this.unit.unit);
        break;
      case 'cm':
        this.convertToCentimeters(this.unit.size, this.unit.unit);
        break;
      case 'dm':
        this.convertToDecimeters(this.unit.size, this.unit.unit);
        break;
      case 'km':
        this.convertToKilometers(this.unit.size, this.unit.unit);
        break;
    }
  }

  private convertToMeters(sizeValue: number, unitValue: string) {

    const toMeters = sizeValue / 100;

    switch (unitValue) {
      case 'cm':
        this.size.get('size').setValue(this.unit.size);
        break;
      case 'dm':
        this.size.get('size').setValue(sizeValue / 10);
        break;
      case 'km':
        this.size.get('size').setValue(sizeValue / 100000);
        break;
      case 'm':
        this.size.get('size').setValue(sizeValue / 100);
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
        this.size.get('size').setValue(sizeValue / 10);
        break;
      case 'km':
        this.size.get('size').setValue(sizeValue / 100000);
        break;
      case 'm':
        this.size.get('size').setValue(sizeValue / 100);
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
        this.size.get('size').setValue(sizeValue / 10);
        break;
      case 'km':
        this.size.get('size').setValue(sizeValue / 100000);
        break;
      case 'm':
        this.size.get('size').setValue(sizeValue / 100);
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
        this.size.get('size').setValue(sizeValue / 10);
        break;
      case 'km':
        this.size.get('size').setValue(sizeValue / 100000);
        break;
      case 'm':
        this.size.get('size').setValue(sizeValue / 100);
    }

    this.value = toKilometers;
  }

  private _initForm() {
    //this.sizeForm = new FormControl(this._val, Validators.required);
    this.sizeForm = this.fb.group({
      size: [this._val],
      unit: [this.unit.unit],
    })
  }

}
