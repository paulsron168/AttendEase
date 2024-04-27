import { Component } from '@angular/core';
import {
  //UntypedFormBuilder,
  //UntypedFormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormBuilder,
  FormGroup,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule, MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { MatIconModule } from '@angular/material/icon';
import { ClassScheduleService } from '../allclassSchedule/classSchedule.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SuccessDialogComponent } from '../allclassSchedule/dialog/success-dialog/success-dialog.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker'; 
import { CommonModule } from '@angular/common';
 



@Component({
  selector: 'app-add-classSchedule',
  templateUrl: './add-classSchedule.component.html',
  styleUrls: ['./add-classSchedule.component.scss'],
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
    MatButtonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatIconModule,
    NgxMaterialTimepickerModule,
    MatDatepickerModule,
    MatNativeDateModule,
    CommonModule,
    

  ],
})
export class AddClassScheduleComponent {

  
  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  public Editor: any = ClassicEditor;
  private _dialogRef: MatDialogRef<SuccessDialogComponent> | undefined;
  class_Day: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  constructor(private fb: FormBuilder, private classScheduleService: ClassScheduleService, private snackBar: MatSnackBar, private _dialog: MatDialog) {
    this.docForm = this.fb.group({
      class_ID: ['', [Validators.required]],
      class_Day: ['', [Validators.required]],
      class_Start: ['', [Validators.required]],
      class_End: ['', [Validators.required]],
      class_Section: ['', [Validators.required]],
      room: ['', [Validators.required]],
    });
  }
  

  onSubmit() {
    if (this.docForm.valid) {
      const formValue = this.docForm.value;
     
      // Format class_Start time to 'HH:mm' format
      //formValue.class_Start = formatDate(formValue.class_Start, 'HH:mm', 'en-US');
      // Similarly, format class_End time if needed
      //formValue.class_End= formatDate(formValue.class_End, 'HH:mm', 'en-US');
  
      this.classScheduleService.addClassSchedule(formValue)
        .subscribe(
          (response: any) => {
            console.log('Class Schedule added successfully:', response);
            this.openSuccessDialog('Class Schedule information has been successfully Added!');
            this.docForm.reset();
          },
          (error: any) => {
            console.error('Error adding Class Schedule:', error);
            // Handle error
          }
        );
    }
  }


  cancel() {
    this.docForm.reset(); // Reset form fields
  }

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
