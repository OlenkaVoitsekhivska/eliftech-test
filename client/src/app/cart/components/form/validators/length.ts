import { AbstractControl, ValidationErrors } from '@angular/forms';

export function requiredLength(): (
  control: AbstractControl
) => ValidationErrors | null {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value as string;
    if (value && value.trim().length === 0) {
      return { requiredLength: true };
    }
    return null;
  };
}
