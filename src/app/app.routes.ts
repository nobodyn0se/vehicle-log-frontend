// src/app/app.routes.ts
import type { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'logs',
    loadComponent: () => import('./features/logs/logs.component').then(m => m.LogsComponent)
  },
  {
    path: '',
    redirectTo: 'logs',
    pathMatch: 'full'
  }
];
