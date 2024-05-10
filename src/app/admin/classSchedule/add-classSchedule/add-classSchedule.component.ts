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

  formatTime(time:any) {
    const [hourMinute, ampm] = time.split(' ');
    let [hour, minute] = hourMinute.split(':');

    // Convert hour to 24-hour format if PM
    if (ampm.toUpperCase() === 'PM') {
        hour = (parseInt(hour, 10) + 12).toString(); // Add 12 hours for PM
    }

    hour = hour.padStart(2, '0');
    minute = minute.padStart(2, '0');

    return `${hour}:${minute}:00`; // Append seconds
  }

    
  formatDate(date:any) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime =  ("0" + hours).slice(-2) + ':' + minutes + ':' + seconds;
    return date.getFullYear()+'-'+("0" + (date.getMonth()+1)).slice(-2)+ "-" + ("0" + date.getDate()).slice(-2) + " " + strTime;
  }

  onSubmit() {
    if (this.docForm.valid) {
      let q_data = {
        created_by: "admin",
        created_datetime: this.formatDate(new Date()),
        updated_by: "admin",
        updated_datetime: this.formatDate(new Date()),
        class_days: this.docForm.value.class_days.join(', '),
        class_start: this.formatTime(this.docForm.value.value.class_start),
        class_end: this.formatTime(this.docForm.value.value.class_end),
        class_room: this.docForm.value.value.class_room,
        class_subject_id: this.docForm.value.value.class_subject_id,
        class_section_id: this.docForm.value.value.class_section_id,
      }
  
      this.classScheduleService.addClassSchedule(q_data)
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
