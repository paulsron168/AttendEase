import { Component } from '@angular/core';
import {
  //UntypedFormBuilder,
  //UntypedFormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,

} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { TeachersService } from '../allteachers/teachers.service';
import { CommonModule } from '@angular/common';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessDialogComponent } from '../allteachers/dialogs/success-dialog/success-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';


@Component({
  selector: 'app-add-teacher',
  templateUrl: './add-teacher.component.html',
  styleUrls: ['./add-teacher.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    FileUploadComponent,
    MatButtonModule,
    CommonModule,
    MatIconModule
    
  ],
})
export class AddTeacherComponent {

  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  hide: boolean = true;
  hideConformPassword: boolean = true;
  private _dialogRef: MatDialogRef<SuccessDialogComponent> | undefined; 

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  toggleConformPasswordVisibility(): void {
    this.hideConformPassword = !this.hideConformPassword;
  }

  constructor(private fb: FormBuilder, private teacherService: TeachersService, private snackBar: MatSnackBar, private _dialog: MatDialog) {
    this.docForm = this.fb.group({
      TeacherID_Number: ['', [Validators.required]],
      First_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      Middle_Name: ['', [Validators.required]],
      Last_Name: ['', [Validators.required]],
      Gender: ['', [Validators.required]],
      Contact_Number: ['', [Validators.required]],
      password: ['', [Validators.required]],
      conformPassword: ['', [Validators.required]],
      Email_Address: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      DOB: ['', [Validators.required]]
    });
  }

  onSubmit() {
    if (this.docForm.valid) {
      this.teacherService.addTeacher(this.docForm.value)
        .subscribe(
          response => {
            console.log('Teacher added successfully:', response);
            // Optionally, reset the form here
            this.openSuccessDialog('Teacher information has been successfully Added!');
            this.docForm.reset();
            //this.showNotification('snackbar-success', 'Add Record Successfully...!!!');

          },
          error => {
            console.error('Error adding teacher:', error);
            // Handle error
          }
        );
    }
  }

  cancel() {
    this.docForm.reset(); // Reset form fields
  }

  //showNotification(cssClass: string, message: string) {
  //  this.snackBar.open(message, 'Close', {
  //    duration: 9000, // Duration in milliseconds
  //    panelClass: [cssClass],
  //    horizontalPosition: 'center',
  //    verticalPosition: 'bottom'
  //  });


  //}
  openSuccessDialog(message: string): void {
    const dialogRef = this._dialog.open(SuccessDialogComponent, {
      width: '300px',
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe((_result: any) => {
      console.log('The dialog was closed');
    });
  }


}