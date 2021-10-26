import { Component, forwardRef, HostListener, OnInit } from '@angular/core';
import { ControlValueAccessor, FormControl, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';

@Component({
  selector: 'app-image-form',
  templateUrl: './image-form.component.html',
  styleUrls: ['./image-form.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => ImageFormComponent),
      multi: true 
    }
  ]
})
export class ImageFormComponent implements OnInit, ControlValueAccessor {

  public image: FormControl;

  private file: File | null = null;

  constructor() { }

  public ngOnInit(): void {
    this._initForm();
  }

  @HostListener('change', ['$event.target.files']) emitFiles(event: FileList) {
    const file = event && event.item(0);
    this.onChange(file);
    this.file = file;
  }

  public onChange: any = (value) => {};

  public onTouch: any = () => {};

  public writeValue(value: any): void {}

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  private _initForm(): void {
    this.image = new FormControl(null, Validators.required);
  }

}
