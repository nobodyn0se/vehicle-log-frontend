import { Component, EventEmitter, Output } from '@angular/core';
import {FormGroup, ReactiveFormsModule, FormControl} from '@angular/forms';
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
    endDate: new FormControl<string | null>(null)
  });

  onSubmit() {
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
}


