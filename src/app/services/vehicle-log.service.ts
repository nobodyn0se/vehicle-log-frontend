import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import {SearchFilters, VehicleLogData} from '../models/vehicle-log.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VehicleLogService {
  private apiUrl = 'http://localhost:3000/logs';

  constructor(private http: HttpClient) {}

  getLogs(filters: SearchFilters): Observable<VehicleLogData[]> {
    let params = new HttpParams();
    if (filters.vehicleId) params = params.set('vehicle', filters.vehicleId);
    if (filters.code) params = params.set('code', filters.code);
    if (filters.startDate) params = params.set('from', filters.startDate);
    if (filters.endDate) params = params.set('to', filters.endDate);
    console.log(params.toString());

    return this.http.get<VehicleLogData[]>(this.apiUrl, { params });
  }
}
