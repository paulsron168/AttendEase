import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, RouterLink } from '@angular/router';
import { UntypedFormBuilder, UntypedFormGroup, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { SettingsService } from 'app/student/settings/settings.service';
import Swal from 'sweetalert2';


@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss'],
    standalone: true,
    imports: [
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatIconModule,
        MatButtonModule,
        RouterLink,
    ],
})
export class ForgotPasswordComponent implements OnInit {
  authForm!: UntypedFormGroup;
  submitted = false;
  returnUrl!: string;
  constructor(
    private formBuilder: UntypedFormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private settingService:SettingsService
  ) {}
  ngOnInit() {
    this.authForm = this.formBuilder.group({
      email: [
        '',
        [Validators.required, Validators.email, Validators.minLength(5)],
      ],
    });
    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
  }
  get f() {
    return this.authForm.controls;
  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.authForm.invalid) {
      return;
    } else {
      let q_data = {
        email: this.authForm.value.email
      };

      this.settingService.checkEmail(0,q_data).subscribe(
        response => {

          if(response.length > 0){

            let s_data = {
              password: response[0]['lastname'],
            }

            this.settingService.updatePassword(response[0]['id'],s_data)
            .subscribe(
              response => {
                Swal.fire({
                  title: 'Reset Password Successfully',
                  icon: 'success',
                  text: 'Password has been reset. Your new password will be your lastname. Please don\'t forget to change your password afterwards!', 
                  allowOutsideClick: false,
                }).then((result) => {
                  if (result.isConfirmed) {
                     this.router.navigate(['/authentication/signin']);
                  }
                });
              },
              error => {
                console.error('Error getting updatePassword', error);
              }
            );
          
          } else{
            Swal.fire({
              title: 'Invalid Email Address',
              icon: 'error',
              text: 'Please check your email address and try again',
            });
          }
        },
        error => {
          console.error('Error getting section', error);
        }
      );
     
    }
  }
}
