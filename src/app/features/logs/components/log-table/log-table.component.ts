import { Component, Input } from '@angular/core';
import { VehicleLogData } from '../../../../models/vehicle-log.model';
import { DatePipe, NgIf} from "@angular/common";
import {
  MatTableModule
} from "@angular/material/table";

@Component({
  selector: 'app-log-table',
  standalone: true,
  imports: [
    MatTableModule,
    DatePipe,
    NgIf
  ],
  templateUrl: './log-table.component.html',
  styleUrl: './log-table.component.scss'
})

export class LogTableComponent {
  @Input() logs: VehicleLogData[] = [];
  displayedColumns = ['timestamp', 'vehicle_id', 'log_level', 'code', 'message'];
}

