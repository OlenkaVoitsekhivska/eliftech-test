import { Component, Input, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALIDATORS,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';
import { ErrorStateMatcher } from '@angular/material/core';

@Component({
  selector: 'app-input',
  templateUrl: './input.component.html',
  styleUrls: ['./input.component.scss'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => InputComponent),
      multi: true,
    },
    {
      provide: NG_VALIDATORS,
      multi: true,
      useExisting: InputComponent,
    },
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() public label: string = '';
  @Input() public placeholder: string = '';
  @Input() public type: 'text' | 'email' | 'phone' | 'number' = 'text';
  @Input() public errorMessage = 'ERROR';

  readonly errorStateMatcher: ErrorStateMatcher = {
    isErrorState: (ctrl: FormControl) => ctrl && ctrl.invalid && ctrl.dirty,
  };

  private inputValue: any;
  private onChange!: (_: any) => void;
  private onTouched!: () => void;

  get value(): any {
    return this.inputValue;
  }

  set value(v: any) {
    const trimmedInput = v.trim();
    if (trimmedInput !== this.inputValue && trimmedInput.length > 0) {
      this.inputValue = this.type === 'phone' ? +trimmedInput : trimmedInput;
      this.onChange(this.inputValue);
    }
  }

  writeValue(value: any): void {
    if (value !== this.inputValue) {
      this.inputValue = value;
    }
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabledState(isDisabled: boolean): void {
    // Implement if needed
  }
}
