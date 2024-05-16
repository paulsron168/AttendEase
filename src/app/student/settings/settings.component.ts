import { Component, OnInit } from '@angular/core';
import {
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,

} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingsService } from './settings.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { CommonModule } from '@angular/common';
import { AuthService } from '@core';
import Swal from 'sweetalert2';
import { StudentsService } from 'app/admin/students/allstudents/students.service';
import { environment } from 'environments/environment.development';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MatFormFieldModule,
    FormsModule,
    MatInputModule,
    MatButtonModule,
    FileUploadComponent,
    CommonModule,
    ReactiveFormsModule

  ],
})
export class SettingsComponent implements OnInit{


  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  hide: boolean = true;
  hideConformPassword: boolean = true;

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  toggleNewPasswordVisibility(): void {
    this.hide = !this.hide;
  }

  constructor(private fb: FormBuilder, 
    private settingService: SettingsService, 
    private snackBar: MatSnackBar, 
    private _dialog: MatDialog,
    private authService: AuthService,
    private studentService:StudentsService) {
    this.docForm = this.fb.group({
      username: [''],
      old_password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
      First_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      Middle_Name: ['', [Validators.required]],
      Last_Name: ['', [Validators.required]],
      Contact_Number: ['', [Validators.required]],
      Email_Address: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      uploadImg: [''],
    });
  }

  ngOnInit(): void {
    this.initializeData();
  }
  
  initializeData(){
    const currentUser = this.authService.currentUserValue;
    let u_data = {};

    this.settingService.getMyAccountData(currentUser.id,u_data)
    .subscribe(
      response => {
         this.docForm = this.fb.group({
            username: [response[0]['username']],
            old_password: [response[0]['password'], [Validators.required]],
            new_password: [response[0]['password'], [Validators.required]],
            First_Name: [response[0]['firstname'], [Validators.required, Validators.pattern('[a-zA-Z]+')]],
            Middle_Name: [response[0]['middlename'], [Validators.required]],
            Last_Name: [response[0]['lastname'], [Validators.required]],
            Contact_Number: [response[0]['contact_number'], [Validators.required]],
            Email_Address: [response[0]['email_address'], [Validators.required, Validators.email, Validators.minLength(5)]],
            uploadImg: [],
          });
      },
      error => {
        console.error('Error getting section', error);
      }
    );
    
  }

  updateAccount(){
    if (this.docForm.valid) {

      var fd = new FormData();
      var filestoUpload = this.docForm.value.uploadImg;
      let filePath = "";

      if (filestoUpload) {
        let files_len = 1;
        for (let index = 0; index < files_len; index++) {
          fd.append("file", filestoUpload);

        }
        this.studentService.uploadImage(fd)
        .subscribe(
          response => {
            filePath = environment.ImagesPath + response[0]['filename'];
            console.log('uploadedImagePath',filePath);
          },
          error => {
            console.error(error);
          }
        );
      }

      setTimeout(()=>{
        const currentUser = this.authService.currentUserValue;
        let q_data = {};
  
        if(filePath != ""){
          q_data = {
            firstname: this.docForm.value.First_Name,
            middlename: this.docForm.value.Middle_Name,
            lastname: this.docForm.value.Last_Name,
            email_address: this.docForm.value.Email_Address,
            contact_number: this.docForm.value.Contact_Number,
            profile_picture:filePath
          }
        }else{
          q_data = {
            firstname: this.docForm.value.First_Name,
            middlename: this.docForm.value.Middle_Name,
            lastname: this.docForm.value.Last_Name,
            email_address: this.docForm.value.Email_Address,
            contact_number: this.docForm.value.Contact_Number
          }
        }
  
        this.settingService.updateAccount(currentUser.id,q_data)
        .subscribe(
          response => {
            Swal.fire({
              title: 'Update Account Successfully',
              icon: 'success',
              text: "Login again to see your updated profile.",
            });
          },
          error => {
            Swal.fire({
              title: 'Update failed',
              icon: 'error',
              text: 'Please ask the administrator.',
            });
          }
        );
      },1000);
    
    }    
  }

  changePassword() {
    if (this.docForm.valid) {

      const currentUser = this.authService.currentUserValue;
      
      let q_data = {
        password: this.docForm.value.old_password
      }
      let n_data = {
        password: this.docForm.value.new_password
      }

      this.settingService.checkPassword(currentUser.id,q_data)
      .subscribe(
        response => {
          if(response.length == 0){
            Swal.fire({
              title: 'Password Invalid',
              icon: 'error',
              text: 'Current Password is not correct',
            });
          } else{

            this.settingService.updatePassword(currentUser.id,n_data)
            .subscribe(
              response => {
                Swal.fire({
                  title: 'Change Password Successfully',
                  icon: 'success',
                  text: "Please don't forget to record your password.",
                });
              },
              error => {
                console.error('Error getting updatePassword', error);
              }
            );
          }

        },
        error => {
          console.error('Error getting checkPassword', error);
        }
      );
    }
  }
}
