import { Route } from '@angular/router';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { TodayAttendanceComponent } from './today-attendance/today-attendance.component';
import { AttendanceReportComponent } from './attendance-report/attendance-report.component';


export const ATTENDANCE_ROUTE: Route[] = [
  {
    path: 'Today_Attendance',
    component: TodayAttendanceComponent,
  },
  {
    path: 'Attendance_Report',
    component: AttendanceReportComponent,
  },
  { path: '**', component: Page404Component },
];

