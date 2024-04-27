import { Route } from "@angular/router";
import { SettingsComponent } from "./settings.component";
import { Page404Component } from "app/authentication/page404/page404.component";

export const SETTINGS_ROUTE: Route[] = [
  {
    path: "",
    component: SettingsComponent,
  },
  { path: "**", component: Page404Component },
];

