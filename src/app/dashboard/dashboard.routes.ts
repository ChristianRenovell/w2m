import { Routes } from '@angular/router';

export const DASHBOARD_ROUTES: Routes = [
  {
    path: '',
    loadComponent: () =>
      import('./DashboardLayout.component').then(
        (m) => m.DashboardLayoutComponent
      ),
    children: [
      {
        path: '',
        loadComponent: () =>
          import('./dashboard/dashboard.component').then(
            (m) => m.DashboardComponent
          ),
      },
      {
        path: 'management/:mode/:id',
        loadComponent: () =>
          import('./management/management.component').then(
            (m) => m.ManagementComponent
          ),
      },
      {
        path: 'management/:mode',
        loadComponent: () =>
          import('./management/management.component').then(
            (m) => m.ManagementComponent
          ),
      },
    ],
  },
];
