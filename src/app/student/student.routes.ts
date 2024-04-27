import { Page404Component } from '../authentication/page404/page404.component';
import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
import { SettingsComponent } from './settings/settings.component';
export const STUDENT_ROUTE: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'Subject',
    loadChildren: () =>
      import('./subject/subjects.routes').then((m) => m.SUBJRCTS_ROUTE),
  },
  
  {
    path: 'Attendance',
    loadChildren: () =>
      import('./Attendance-Record/attendance.routes').then((m) => m.ATTENDANCE_ROUTE),
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  { path: '**', component: Page404Component },
];

