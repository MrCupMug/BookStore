import { Component, forwardRef, OnInit, OnDestroy, Input } from '@angular/core';
import { AbstractControl, ControlValueAccessor, FormBuilder, FormGroup, NG_VALUE_ACCESSOR } from '@angular/forms';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';

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
export class SizeFormComponent implements OnInit, OnDestroy, ControlValueAccessor {

  @Input()
  public unit: 'cm' | 'dm' | 'm' | 'km';

  public destroy$ = new Subject<void>();

  public sizeForm: FormGroup;

  private size: number;

  constructor(
    private readonly _fb: FormBuilder,
  ) {}

  public get sizeControl(): AbstractControl | null {
    return this.sizeForm.get('size');
  }

  public get unitControl(): AbstractControl | null {
    return this.sizeForm.get('unit');
  }

  public ngOnInit(): void {
    this._initForm();

    this.unitEventListener();
    this.sizeEventListener();
  }

  public ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  public onChange = (value) => {};

  public onTouch = (value) => {};

  public writeValue(size: number): void {
    this.size = size;
    const convertedSize = this.convertValue(size, this.unit);
    this.sizeControl.setValue(convertedSize);
  }

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  private convertValue(value: number, unit: string): number {
    switch (unit) {
      case 'm':
        return value / 100;
      case 'dm':
        return value / 10;
      case 'km':
        return value / 100000;

      default:
        return value;
    }
  }

  private convertToCentimeters(value: number, unit: string): void {
    switch (unit) {
      case 'cm':
        this.size = value;
        break;
      case 'dm':
        this.size = value * 10;
        break;
      case 'm':
        this.size = value * 100;
        break;
      case 'km':
        this.size = value * 100000;
        break;
    }
  }

  private _initForm(): void {
    this.sizeForm = this._fb.group({
      size: [null],
      unit: [this.unit],
    });
  }

  private unitEventListener(): void {
    this.sizeForm.get('unit').valueChanges
    .pipe(
      takeUntil(this.destroy$),
    )
    .subscribe((unit: string) => {
      const test = this.unitControl.value;
      const convertedValue = this.convertValue(this.size, test);
      this.sizeControl.setValue(convertedValue);
    });
  }

  private sizeEventListener(): void {
    this.sizeControl.valueChanges
    .pipe(
      takeUntil(this.destroy$),
    )
    .subscribe((size: number) => {
      this.convertToCentimeters(size, this.unitControl.value);
      this.onChange(this.size);
    });
  }

}
