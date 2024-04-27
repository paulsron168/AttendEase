import { Route } from "@angular/router";


import { AllclassScheduleComponent } from "./allclassSchedule/allclassSchedule.component";
 
import { AddClassScheduleComponent } from "./add-classSchedule/add-classSchedule.component";
import { Page404Component } from "app/authentication/page404/page404.component";
export const CLASSSCHEDULE_ROUTE: Route[] = [
  {
    path: "allclassSchedule",
    component: AllclassScheduleComponent,
  },
  {
    path: "add-classSchedule",
    component: AddClassScheduleComponent,
  },
  { path: "**", component: Page404Component },
];
