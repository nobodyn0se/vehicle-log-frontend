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
    vehicle_id?: string;
    code?: string;
    start?: string;
    end?: string;
  }>();

  form = new FormGroup({
    vehicle_id: new FormControl<string>(''),
    code: new FormControl<string>(''),
    start: new FormControl<string>(''),
    end: new FormControl<string>('')
  });

  onSubmit() {
    const raw = this.form.value;

    // Clean nulls (or empty strings) to undefined
    const cleaned = Object.fromEntries(
      Object.entries(raw).map(([k, v]) => [k, v ?? undefined])
    ) as {
      vehicle_id?: string;
      code?: string;
      start?: string;
      end?: string;
    };

    this.search.emit(cleaned);
  }

  onReset() {
    this.form.reset();
    this.search.emit({});
  }
}


