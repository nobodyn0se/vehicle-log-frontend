import {Component, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogSearchComponent } from './components/log-search/log-search.component';
import { LogTableComponent } from './components/log-table/log-table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { VehicleLogData } from '../../models/vehicle-log.model';
import {VehicleLogService} from "../../services/vehicle-log.service";
import {catchError, finalize} from "rxjs/operators";
import {of} from "rxjs";

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule, LogSearchComponent, LogTableComponent, MatProgressSpinnerModule],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss'
})

export class LogsComponent {
  // private logService = inject(VehicleLogService);

  logs = signal<VehicleLogData[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  // Mock search handler: replace with real API call
  onSearch(filters: { vehicle_id?: string; code?: string; start?: string; end?: string }) {
    this.loading.set(true);
    this.error.set(null);

    // Simulate async fetch:
    setTimeout(() => {
      this.logs.set([
        {
          log_timestamp: '2025-01-03T05:35:50.000Z',
          vehicle_id: '1011',
          log_level: 'WARN',
          code: 'P0301',
          message: 'Cylinder 1 misfire detected'
        }
      ]);
      this.loading.set(false);
    }, 1000);

    // this.logService.getLogs(filters).pipe(
    //   catchError(err => {
    //     this.error.set('Failed to load logs');
    //     return of([]);
    //   }),
    //   finalize(() => this.loading.set(false))
    // ).subscribe(data => {
    //   this.logs.set(data);
    // });
  }
}

