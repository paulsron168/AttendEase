import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Role, AuthService } from '@core';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
import { BehaviorSubject, Observable, of, throwError } from 'rxjs';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { User } from '../../core/models/user';

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss'],
    standalone: true,
    imports: [
        RouterLink,
        MatButtonModule,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        CommonModule
    ],
})
export class SigninComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;

  authForm!: UntypedFormGroup;
  submitted = false;
  loading = false;
  error = '';
  hide = true;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    
  ) {
    super();

    this.currentUserSubject = new BehaviorSubject<User>(
      JSON.parse(localStorage.getItem('currentUser') || '{}')
    );
    this.currentUser = this.currentUserSubject.asObservable();
  }

  ngOnInit() {
    this.authForm = this.formBuilder.group({
      username: ['admin@software.com', Validators.required],
      password: ['admin@123', Validators.required],
    });
  }
  get f() {
    return this.authForm.controls;
  }
  // adminSet() {
  //   this.authForm.get('username')?.setValue('admin@software.com');
  //   this.authForm.get('password')?.setValue('admin@123');
  // }
  // teacherSet() {
  //   this.authForm.get('username')?.setValue('teacher@software.com');
  //   this.authForm.get('password')?.setValue('teacher@123');
  // }

  error1(message: string) {
    return throwError(message);
  }
  ok(body?: {
    id: number;
    img: string;
    username: string;
    firstName: string;
    lastName: string;
    token: string;
  }) {
    return of(new HttpResponse({ status: 200, body }));
  }

  capitalizeFirstLetter(string:any) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}
  
  onSubmit() {
    this.submitted = true;
    this.loading = true;
    this.error = '';
    if (this.authForm.invalid) {
      this.error = 'Username and Password not valid !';
      return;
    } else {

      this.authService.login(this.f['username'].value, this.f['password'].value)
      .subscribe(
        (response: any) => {
          setTimeout(() => {
            let user = response[0];
            const role = this.capitalizeFirstLetter(response[0]['user_type']);
            console.log('role',role);
            if (role === Role.All || role === Role.Admin) {
              console.log('/admin/dashboard/main');
              // this.currentUserSubject.next(user);
              // this.authService.currentUserValue.id = user.id;
              // this.authService.currentUserValue.username = user.username;
              // this.authService.currentUserValue.password = user.password;
              // this.authService.currentUserValue.firstName = user.firstname;
              // this.authService.currentUserValue.lastName = user.lastname;
              // this.authService.currentUserValue.role = role;
              // this.authService.currentUserValue.token = 'admin-token';

           

              // this.ok({
              //   id: user.id,
              //   img: user.id,
              //   username: user.username,
              //   firstName: user.firstname,
              //   lastName: user.lastname,
              //   token: user.token,
              // });

              this.router.navigate(['admin/dashboard/main']);

            } else if (role === Role.Teacher){
              console.log('/teacher/dashboard');
              this.router.navigate(['/teacher/dashboard']);
            } else if (role === Role.Student){
              console.log('/student/dashboard');
              this.router.navigate(['/student/dashboard']);
            } else {
              this.router.navigate(['../authentication/signin']);
            }
            this.loading = false;
          }, 1000);
          console.log('user login successfully:', response[0]);

          // Optionally, reset the form here
        },
        (error: any) => {
          console.error('Error logging in', error);
          return this.error1('Username or password is incorrect');
          // Handle error
        }
      );
  }
    //   this.subs.sink = this.authService
    //     .login(this.f['username'].value, this.f['password'].value)
    //     .subscribe(
    //       (res) => {
    //         if (res) {
    //           setTimeout(() => {
    //             const role = this.authService.currentUserValue.role;
    //             if (role === Role.All || role === Role.Admin) {
    //               this.router.navigate(['/admin/dashboard/main']);
    //             } else if (role === Role.Teacher){
    //               this.router.navigate(['/teacher/dashboard']);
    //             } else {
    //               this.router.navigate(['/authentication/signin']);
    //             }
    //             this.loading = false;
    //           }, 1000);
    //         } else {
    //           this.error = 'Invalid Login';
    //         }
    //       },
    //       (error) => {
    //         this.error = error;
    //         this.submitted = false;
    //         this.loading = false;
    //       }
    //     );
    // }
  }
}
