import { Route } from "@angular/router";
import { AddTeacherComponent } from "./add-teacher/add-teacher.component";
import { Page404Component } from "../../authentication/page404/page404.component";
import { AllteachersComponent } from "./allteachers/allteachers.component";
export const ADMIN_TEACHER_ROUTE: Route[] = [
  {
    path: "allTeachers",
    component: AllteachersComponent,
  },
  {
    path: "add-teacher",
    component: AddTeacherComponent,
  },
  { path: "**", component: Page404Component },
];
