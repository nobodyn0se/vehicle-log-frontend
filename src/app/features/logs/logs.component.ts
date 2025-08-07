import {Component, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogSearchComponent } from './components/log-search/log-search.component';
import { LogTableComponent } from './components/log-table/log-table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {SearchFilters, VehicleLogData} from '../../models/vehicle-log.model';
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
  private logService = inject(VehicleLogService);

  logs = signal<VehicleLogData[]>([]);
  loading = signal(false);
  error = signal<string | null>(null);

  // Mock search handler: replace with real API call
  onSearch(filters: SearchFilters) {

    this.loading.set(true);
    this.error.set(null);

    this.logService.getLogs(filters).pipe(
      catchError(err => {
        this.error.set('Failed to load logs');
        return of([]);
      }),
      finalize(() => this.loading.set(false))
    ).subscribe(data => {
      this.logs.set(data);
    });
  }
}

