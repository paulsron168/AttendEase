import { Route } from '@angular/router';
import { Page404Component } from 'app/authentication/page404/page404.component';
import { MyProjectsComponent } from './subjects/subjects.component';
import { NetworkingComponent } from './attendance/networking/networking.component';
import { ProgrammingComponent } from './attendance/programming/programming.component';

export const SUBJRCTS_ROUTE: Route[] = [
  {
    path: 'subject',
    component: MyProjectsComponent,
  },

  {
    path: 'networking',
    component: NetworkingComponent,
  },
  {
    path: 'programming',
    component: ProgrammingComponent,
  },
  { path: '**', component: Page404Component },
];

