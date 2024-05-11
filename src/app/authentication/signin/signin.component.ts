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
import { HttpResponse } from '@angular/common/http';
import { User } from '../../core/models/user';
import Swal from 'sweetalert2';
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
      username: ['', Validators.required],
      password: ['', Validators.required],
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
          if(response.length > 0){
            setTimeout(() => {
              let user = response[0];
              const role = this.capitalizeFirstLetter(response[0]['user_type']);

              if (role === Role.All || role === Role.Admin) {             
                this.router.navigate(['admin/dashboard/main']);
              } else if (role === Role.Teacher){
                this.router.navigate(['/teacher/dashboard']);
              } else if (role === Role.Student){
                this.router.navigate(['/student/dashboard']);
              } else {
                this.router.navigate(['../authentication/signin']);
              }
              this.loading = false;
            }, 1000);
          } else{
            Swal.fire({
              title: 'Error',
              icon: 'error',
              text: 'Login failed.',
              allowOutsideClick: false,
            }).then((result) => {
              if (result.isConfirmed) {
                window.location.reload();
              }
            });
          }

          // Optionally, reset the form here
        },
        (error: any) => {
          console.error('Error logging in', error);
          return this.error1('Username or password is incorrect');
          // Handle error
        }
      );
  }
  }
}
