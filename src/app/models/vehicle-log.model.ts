export interface VehicleLogData {
  log_timestamp: string;
  vehicle_id: string;
  log_level: string;
  code: string;
  message: string;
}

export interface SearchFilters {
  vehicleId?: string;
  code?: string;
  startDate?: string;
  endDate?: string;
}
