import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { VehicleLogData } from '../models/vehicle-log.model';
import { Observable } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class VehicleLogService {
  private apiUrl = 'http://localhost:3000/logs';

  constructor(private http: HttpClient) {}

  getLogs(filters: any): Observable<VehicleLogData[]> {
    let params = new HttpParams();
    if (filters.vehicleId) params = params.set('vehicleId', filters.vehicleId);
    if (filters.errorCode) params = params.set('errorCode', filters.errorCode);
    if (filters.startDate) params = params.set('startDate', filters.startDate);
    if (filters.endDate) params = params.set('endDate', filters.endDate);

    return this.http.get<VehicleLogData[]>(this.apiUrl, { params });
  }
}
