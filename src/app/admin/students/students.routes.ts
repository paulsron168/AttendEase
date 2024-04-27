import { Route } from "@angular/router";
import { AddStudentComponent } from "./add-student/add-student.component";
import { Page404Component } from "../../authentication/page404/page404.component";
import { AllstudentsComponent } from "./allstudents/allstudents.component";

export const ADMIN_STUDENT_ROUTE: Route[] = [
  {
    path: "allstudents",
    component: AllstudentsComponent,
  },
  {
    path: "add-student",
    component: AddStudentComponent,
  },
  { path: "**", component: Page404Component },
];
