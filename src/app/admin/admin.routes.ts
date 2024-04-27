import { Route } from '@angular/router';

export const ADMIN_ROUTE: Route[] = [
  {
    path: 'dashboard',
    loadChildren: () =>
      import('./dashboard/dashboard.routes').then((m) => m.ADMIN_DASHBOARD_ROUTE),
  },
  {
    path: 'subjects',
    loadChildren: () =>
      import('./subjects/subjects.routes').then((m) => m.SUBJECT_ROUTE),
  },
  {
    path: 'teachers',
    loadChildren: () =>
      import('./teachers/teachers.routes').then((m) => m.ADMIN_TEACHER_ROUTE),
  },
  {
    path: 'students',
    loadChildren: () =>
      import('./students/students.routes').then((m) => m.ADMIN_STUDENT_ROUTE),
  },
  {
    path: 'classSchedule',
    loadChildren: () =>
      import('./classSchedule/classSchedule.routes').then((m) => m.CLASSSCHEDULE_ROUTE),
  },
  {
    path: 'attendance',
    loadChildren: () =>
      import('./attendance/attendance.routes').then((m) => m.ATTENDANCE_ROUTE),
  },
  
  {
    path: 'settings',
    loadChildren: () =>
      import('./settings/settings.routes').then((m) => m.SETTINGS_ROUTE),
  },
];

