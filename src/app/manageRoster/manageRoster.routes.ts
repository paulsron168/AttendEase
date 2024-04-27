import { Route } from "@angular/router";
import { Page404Component } from "app/authentication/page404/page404.component";
import { AddRosterComponent } from "./add-roster/add-roster.component";
import { AllRosterComponent } from "./allRoster/allRoster.component";
export const MANAGEROSTER_ROUTE: Route[] = [
  {
    path: "allRoster",
    component: AllRosterComponent,
  },
  {
    path: "add-roster",
    component:AddRosterComponent,
  },
  { path: '**', component: Page404Component },
];
