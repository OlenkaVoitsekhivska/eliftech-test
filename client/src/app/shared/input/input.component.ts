import { Component, Input, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

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
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() public label: string = '';
  @Input() public placeholder: string = '';
  @Input() public type: 'text' | 'email' | 'tel' | 'number' = 'text';
  @Input() public errorMessage = 'ERROR';

  private inputValue: any;
  private onChange!: (_: any) => void;
  private onTouched!: () => void;

  get value(): any {
    return this.inputValue;
  }

  set value(v: any) {
    const trimmedInput = v.trim();
    if (trimmedInput !== this.inputValue && trimmedInput.length > 0) {
      this.inputValue = this.type === 'tel' ? +trimmedInput : trimmedInput;
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
