import {Component, EventEmitter, Output} from '@angular/core';
import {AbstractControl, FormControl, FormGroup, ReactiveFormsModule, ValidatorFn} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import {MatButton} from '@angular/material/button';

@Component({
  selector: 'app-log-search',
  standalone: true,
  imports: [ReactiveFormsModule, MatInputModule, MatButton],
  templateUrl: './log-search.component.html',
  styleUrl: './log-search.component.scss'
})

export class LogSearchComponent {
  @Output() search = new EventEmitter<{
    vehicleId?: string;
    code?: string;
    startDate?: string;
    endDate?: string;
  }>();

  form = new FormGroup({
    vehicleId: new FormControl<string>(''),
    code: new FormControl<string>(''),
    startDate: new FormControl<string | null>(null),
    endDate: new FormControl<string | null>(null),
  }, [this.generalValidator, this.dateRangeValidator]);

  get minEndDate(): string {
    return this.form.get('startDate')?.value || '';
  }

  generalValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const formGroup = control as FormGroup; // Cast the control to FormGroup
      const vehicleId = formGroup.get('vehicleId')?.value;
      const code = formGroup.get('code')?.value;
      const startDate = formGroup.get('startDate')?.value;
      const endDate = formGroup.get('endDate')?.value;

      if (!vehicleId && !code && !(startDate && endDate)) {
        return { atLeastOneRequired: true };
      }
      return null;
    };
  }

  // Date range validation - only triggered when dates are provided
  dateRangeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const formGroup = control as FormGroup; // Cast the control to FormGroup
      const startDate = formGroup.get('startDate')?.value;
      const endDate = formGroup.get('endDate')?.value;

      // Only validate date range if startDate is provided
      if (startDate || endDate) {
        if (!startDate || !endDate) {
          return { incompleteDateRange: true };
        }
      }

      return null;
    };
  }

  onSubmit() {
    if(this.form.invalid) {
      return;
    }
    const raw = this.form.value;

    // Clean nulls (or empty strings) to undefined
    const cleaned = Object.fromEntries(
      Object.entries(raw).map(([k, v]) => [k, v ?? undefined])
    ) as {
      vehicleId?: string;
      code?: string;
      startDate?: string;
      endDate?: string;
    };

    console.log(cleaned);

    this.search.emit(cleaned);
  }

  onReset() {
    this.form.reset();
    this.search.emit({});
  }

  get isFormValid() {
    const vehicleId = this.form.get('vehicleId')?.value;
    const code = this.form.get('code')?.value;
    const startDate = this.form.get('startDate')?.value;
    const endDate = this.form.get('endDate')?.value;

    return vehicleId || code || (startDate && endDate);
  }
}


