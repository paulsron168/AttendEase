import { Route } from "@angular/router";
import { AllsubjectsComponent } from "./allsubjects/allsubjects.component";
import { Page404Component } from "../../authentication/page404/page404.component";
import { AddsubjectsComponent } from "./add-subject/add-subject.component";
export const SUBJECT_ROUTE: Route[] = [
  {
    path: "add-subject",
    component: AddsubjectsComponent,
  },
  {
    path: "allsubjects",
    component: AllsubjectsComponent,
  },
  { path: "**", component: Page404Component },
];
