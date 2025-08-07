import { Injectable, computed, effect, signal } from '@angular/core';
import { VehicleLogData } from '../models/vehicle-log.model';
import { VehicleLogService } from '../services/vehicle-log.service';
import { catchError, finalize } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VehicleLogsStore {
  // Internal state signals
  private _logs = signal<VehicleLogData[]>([]);
  private _loading = signal(false);
  private _error = signal<string | null>(null);

  // Public read-only signals
  readonly logs = this._logs.asReadonly();
  readonly loading = this._loading.asReadonly();
  readonly error = this._error.asReadonly();

  constructor(private logService: VehicleLogService) {}

  /** Fetch logs from the backend with optional filters */
  fetchLogs(filters: any) {
    this._loading.set(true);
    this._error.set(null);

    this.logService.getLogs(filters).pipe(
      finalize(() => this._loading.set(false)),
      catchError(err => {
        this._error.set(err?.message || 'Unknown error');
        return of([]);
      })
    ).subscribe(logs => {
      this._logs.set(logs);
    });
  }

  /** Reset state (e.g., on component destroy or new search flow) */
  reset() {
    this._logs.set([]);
    this._error.set(null);
    this._loading.set(false);
  }
}
