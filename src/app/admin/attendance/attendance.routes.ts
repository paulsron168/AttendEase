import { Route } from "@angular/router";
import { TodayComponent } from './today/today.component';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { AttendanceSheetComponent } from './attendance-sheet/attendance-sheet.component';

export const ATTENDANCE_ROUTE: Route[] = [
  {
    path: 'today',
    component: TodayComponent,
  },
  {
    path: 'attendance-sheet',
    component: AttendanceSheetComponent,
  },
  { path: '**', component: Page404Component },
];

