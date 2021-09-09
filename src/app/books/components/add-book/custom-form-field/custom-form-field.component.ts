import { FocusMonitor } from '@angular/cdk/a11y';
import { Component, OnInit, OnDestroy, Input, Optional, Self, ElementRef } from '@angular/core';
import { FormBuilder, FormGroup, NgControl, ControlValueAccessor } from '@angular/forms';
import { MatFormFieldControl } from '@angular/material';
import { Subject } from 'rxjs';
import { coerceBooleanProperty } from '@angular/cdk/coercion';

class MyTel {
  constructor(
    public area: string,
    public exchange: string,
    public subscriber: string,
  ) {}
}

@Component({
  selector: 'app-custom-form-field',
  templateUrl: './custom-form-field.component.html',
  styleUrls: ['./custom-form-field.component.scss'],
  providers: [
    {
      provide: MatFormFieldControl,
      useExisting: CustomFormFieldComponent
    },
  ],
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.example-floating]': 'shouldLabelFloat',
    '[id]': 'id',
    '[attr.aria-describedby]': 'describedBy',
  },
})
export class CustomFormFieldComponent implements OnInit, OnDestroy, MatFormFieldControl<MyTel>, ControlValueAccessor {

  public errorState = false;

  public controlType = 'app-custom-form-field';

  public parts: FormGroup;

  public stateChanges = new Subject<void>();

  public focused = false;

  // What the hell is this?
  // According to the guide it provides an unique id
  // But how and for what reason?
  id = `app-custom-form-field-${CustomFormFieldComponent.nextId++}`;

  public describedBy = '';

  static nextId = 0;

  private _placeholder: string;

  private _required = false;

  private _disabled = false;

  constructor(
    private readonly _fb: FormBuilder,
    @Optional() @Self() public ngControl: NgControl,
    private readonly fm: FocusMonitor,
    private readonly elRef: ElementRef<HTMLElement>
  ) {

    if (this.ngControl != null) {
      this.ngControl.valueAccessor = this;
    }

    fm.monitor(elRef, true)
      .subscribe((origin) => {
        if (this.focused && !origin) {
        this.onTouch();
      }
        this.focused = !!origin;
        this.stateChanges.next();
      });

  }

  @Input()
  get value(): MyTel | null {
    const n = this.parts.value;
    if (n.area.length === 3 && n.exchange.length === 3
      && n.subscriber.length === 4) {
        return new MyTel(n.area, n.exchange, n.subscriber);
      }

    return null;
  }
  set value(tel: MyTel | null) {
    tel = tel || new MyTel('', '', '');
    this.parts.setValue(
      {
        area: tel.area,
        exchange: tel.exchange,
        subscriber: tel.subscriber,
      }
    );

    this.stateChanges.next();
  }

  @Input()
    get placeholder(): string {
      return this._placeholder;
    }
    set placeholder(placeholder: string) {
      this._placeholder = placeholder;
      this.stateChanges.next();
    }

  @Input()
    get required(): boolean {
      return this._required;
    }
    set required(req: boolean) {
      this._required = coerceBooleanProperty(req);
      this.stateChanges.next();
    }

  @Input()
    get disabled(): boolean {
      return this._disabled;
    }
    set disabled(value: boolean) {
      this._disabled = coerceBooleanProperty(value);
      this._disabled ? this.parts.disable() : this.parts.enable();
      this.stateChanges.next();
    }

  get empty(): boolean {
    const formParts = this.parts.value;
    return !formParts.area && !formParts.exchange && !formParts.subscriber;
  }

  // Is used by the <mat-form-field> to specify
  // the IDs that should be used for the aria-describedby attribute
  setDescribedByIds(ids: string[]) {
    this.describedBy = ids.join(' ');
  }

  // @HostBinding('.class.floating')
    get shouldLabelFloat(): boolean {
      return this.focused || !this.empty;
    }

  // It will be called when
  // the formField is clicked on
  onContainerClick(event: MouseEvent) {
    if ((event.target as Element)
      .tagName.toLowerCase() !== 'input') {
        this.elRef.nativeElement.querySelector('input')
          .focus();
    }
  }

  ngOnInit() {
    this._initForm();
  }

  ngOnDestroy() {
    this.stateChanges.complete();
    this.fm.stopMonitoring(this.elRef);
  }

  public writeValue(val: any) { }

  public onChange = (value) => {};

  public onTouch = () => {};

  public registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  public registerOnTouched(fn: any): void {
    this.onTouch = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    this.disabled = isDisabled;
  }

  public handleInput(): void {
    this.onChange(this.parts.value);
  }

  private _initForm(): void {
    this.parts = this._fb.group(
      {
        area: '',
        exchange: '',
        subscriber: '',
      }
    );
  }

}
