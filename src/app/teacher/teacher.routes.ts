import { Page404Component } from '../authentication/page404/page404.component';
import { Route } from '@angular/router';
import { DashboardComponent } from './dashboard/dashboard.component';
 
import { SettingsComponent } from './settings/settings.component';
import { Attendance_Record_Component } from './attendance_record/attendance_record.component';
import { MyClassComponent } from './myclass/myclass.component';
import { TodayComponent } from './today/today.component';
import { AttendanceSheetComponent } from './attendance-sheet/attendance-sheet.component';

export const TEACHER_ROUTE: Route[] = [
  {
    path: 'dashboard',
    component: DashboardComponent,
  },
  {
    path: 'myclass',
    component: MyClassComponent,
  },
  {
    path: 'attendance_record',
    component: Attendance_Record_Component,
  },
  {
    path: 'today',
    component: TodayComponent,
  },
  {
    path: 'attendance-sheet',
    component: AttendanceSheetComponent,
  },
  {
    path: 'settings',
    component: SettingsComponent,
  },
  { path: '**', component: Page404Component },
];

