import {
  Component,
  Input,
  OnInit,
  Optional,
  Self,
  forwardRef,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  NgControl,
  NgControlStatus,
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
  ],
})
export class InputComponent implements ControlValueAccessor {
  @Input() label: string = '';
  @Input() placeholder: string = '';
  @Input() type: 'text' | 'email' | 'phone' | 'number' = 'text';
  @Input() errorMessage = 'ERROR';

  readonly errorStateMatcher: ErrorStateMatcher = {
    isErrorState: (ctrl: FormControl) => ctrl && ctrl.invalid && ctrl.dirty,
    // isErrorState: (ctrl: FormControl) => ctrl.invalid && ctrl.dirty,
  };

  private inputValue: any;
  private onChange!: (_: any) => void;
  private onTouched!: () => void;

  get value(): any {
    return this.inputValue;
  }

  set value(v: any) {
    if (v !== this.inputValue && v.trim().length > 0) {
      if (this.type === 'phone') {
        this.inputValue = +v;
        this.onChange(+v);
      }
      this.inputValue = v;
      this.onChange(v);
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
