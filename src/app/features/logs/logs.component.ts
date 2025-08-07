import {Component, inject, signal} from '@angular/core';
import { CommonModule } from '@angular/common';
import { LogSearchComponent } from './components/log-search/log-search.component';
import { LogTableComponent } from './components/log-table/log-table.component';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import {SearchFilters, VehicleLogData} from '../../models/vehicle-log.model';
import {VehicleLogService} from "../../services/vehicle-log.service";
import {catchError, finalize} from "rxjs/operators";
import {of} from "rxjs";
import {VehicleLogsStore} from "../../store/vehicle-log.store";

@Component({
  selector: 'app-logs',
  standalone: true,
  imports: [CommonModule, LogSearchComponent, LogTableComponent, MatProgressSpinnerModule],
  templateUrl: './logs.component.html',
  styleUrl: './logs.component.scss'
})

export class LogsComponent {
  private store = inject(VehicleLogsStore);

  logs = this.store.logs;
  loading = this.store.loading;
  error = this.store.error;


  onSearch(filters: any) {
    this.store.fetchLogs(filters);
  }
}

