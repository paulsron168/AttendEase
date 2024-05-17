import { Component, Input } from '@angular/core';
import { FeatherIconsComponent } from '../feather-icons/feather-icons.component';
import { RouterLink } from '@angular/router';
import { AuthService } from '@core';

@Component({
    selector: 'app-breadcrumb',
    templateUrl: './breadcrumb.component.html',
    styleUrls: ['./breadcrumb.component.scss'],
    standalone: true,
    imports: [RouterLink, FeatherIconsComponent],
})
export class BreadcrumbComponent {
  @Input()
  title!: string;
  @Input()
  items!: string[];
  @Input()
  active_item!: string;
  homePage:any;

  constructor(
    private authService:AuthService
  ) {
    //constructor

    const userRole = this.authService.currentUserValue.role;

    if (userRole === 'Admin') {
      this.homePage = '/admin/dashboard/main';
    } else if (userRole === 'Student') {
      this.homePage = '/student/dashboard';
    } else if (userRole === 'Teacher') {
      this.homePage = '/teacher/dashboard';
    } else {
      this.homePage = '/admin/dashboard/main';
    }
    '/teacher/dashboard'
  }
}
