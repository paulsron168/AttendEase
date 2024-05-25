import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose, MatDialog } from '@angular/material/dialog';
import { Component, Inject, OnInit } from '@angular/core';
import { ClassScheduleService } from '../../classSchedule.service';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ClassSchedule } from '../../classSchedule.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import { CommonModule } from '@angular/common';
import { StudentsService } from 'app/admin/students/allstudents/students.service';
 
//import { TimePickerModule } from '@syncfusion/ej2-angular-calendars';


export interface DialogData {
  id: number;
  action: string;
  classSchedule: ClassSchedule;

}

@Component({
    selector: 'app-form-dialog:not(a)',
    templateUrl: './form-dialog.component.html',
    styleUrls: ['./form-dialog.component.scss'],
    standalone: true,
    imports: [
        MatButtonModule,
        MatIconModule,
        MatDialogContent,
        FormsModule,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatDatepickerModule,
        MatDialogClose,
        MatOptionModule,
        MatSelectModule,
        NgxMaterialTimepickerModule,
        CommonModule,
        

        
    ],
})
export class FormDialogComponent implements OnInit {
  classSection: any[] = [];

  loading: boolean = false;
  action: string;
  dialogTitle: string;
  classScheduleForm: UntypedFormGroup;
  classSchedule: ClassSchedule;
   
  //dialog: any;
  isReadOnly: boolean = true;
  private _dialogRef: MatDialogRef<UpdateDialogComponent> | undefined;
  sectionList:any;
  subjectList:any;
  paginator: any;

  class_Day: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public classScheduleService: ClassScheduleService,
    public studentsService: StudentsService,
    private fb: UntypedFormBuilder,
    private _dialog: MatDialog,
        
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.classSchedule.id + ' '  ;
      this.classSchedule = data.classSchedule;
    } else {
      this.dialogTitle = 'New ClassSchedule';
      const blankObject = {} as ClassSchedule;
      this.classSchedule = new ClassSchedule(blankObject);
    }
    this.classScheduleForm = this.createContactForm();
  }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.studentsService.getSection()
    .subscribe(
      response => {
        this.sectionList = response;
      },
      error => {
        console.error('Error getting section', error);
      }
    );

    this.studentsService.getSubject()
    .subscribe(
      response => {
        this.subjectList = response;
      },
      error => {
        console.error('Error getting section', error);
      }
    );
  }

  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
      ? 'Not a valid email'
      : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      ID: [this.classSchedule.id],
      class_days: [this.classSchedule.class_days],
      class_start: [this.classSchedule.class_start],
      class_end: [this.classSchedule.class_end],
      class_subject: [this.classSchedule.class_subject],
      class_section: [this.classSchedule.class_section],
      class_room: [this.classSchedule.class_room],      
    });
  }
  submit() {
    //empty
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  formatTime(time:any) {
    const [hourMinute, ampm] = time.split(' ');
    let [hour, minute] = hourMinute.split(':');

    // Convert hour to 24-hour format if PM
    if (ampm.toUpperCase() === 'PM') {
        hour = (parseInt(hour, 10) + 12).toString(); // Add 12 hours for PM
    }

    if (ampm.toUpperCase() === 'AM' && hour == '12') {
      hour = '0';
    }

    hour = hour.padStart(2, '0');
    minute = minute.padStart(2, '0');

    return `${hour}:${minute}:00`; // Append seconds
  }

  formatDate(date:any) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime =  ("0" + hours).slice(-2) + ':' + minutes + ':' + seconds;
    return date.getFullYear()+'-'+("0" + (date.getMonth()+1)).slice(-2)+ "-" + ("0" + date.getDate()).slice(-2) + " " + strTime;
  }

  addSchedule(){
    if (this.classScheduleForm.valid) {
      let q_data = {
        created_by: "admin",
        created_datetime: this.formatDate(new Date()),
        updated_by: "admin",
        updated_datetime: this.formatDate(new Date()),
        class_days: this.classScheduleForm.value.class_days.join(', '), // Join all academic levels into a single string
        class_start: this.formatTime(this.classScheduleForm.value.class_start),
        class_end: this.formatTime(this.classScheduleForm.value.class_end),
        class_room: this.classScheduleForm.value.class_room,
        class_subject_id: this.classScheduleForm.value.class_subject,
        class_section_id: this.classScheduleForm.value.class_section,
      };

      this.classScheduleService.addClassSchedule(q_data).subscribe({
        next: (val: any) => {
          this.openSuccessDialog('Class Schedule information has been successfully inserted!');
          this.dialogRef.close(true);
           //Reload the page
          //window.location.reload();
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }

  updateClassSchedule() {
    if (this.classScheduleForm.valid && this.data && this.data.classSchedule) {

      let q_data = {
        updated_by: "admin",
        updated_datetime: this.formatDate(new Date()),
        class_days: this.classScheduleForm.value.class_days.join(', '), // Join all academic levels into a single string
        class_start: this.formatTime(this.classScheduleForm.value.class_start),
        class_end: this.formatTime(this.classScheduleForm.value.class_end),
        class_room: this.classScheduleForm.value.class_room,
        class_subject_id: this.classScheduleForm.value.class_subject,
        class_section_id: this.classScheduleForm.value.class_section,
      };
      // console.log('q_data',q_data);

      this.classScheduleService.updateClassSchedule(this.data.classSchedule.id, q_data).subscribe({
        next: (val: any) => {
          this.openSuccessDialog('Class Schedule information has been successfully Updated!');
          this.dialogRef.close(true);
           //Reload the page
          //window.location.reload();
        },
        error: (err: any) => {
          console.error(err);
        },
      });
    }
  }

  openSuccessDialog(message: string): void {
    const dialogRef = this._dialog.open(UpdateDialogComponent, {
      width: '300px',
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe((_result: any) => {
      console.log('The dialog was closed');
      window.location.reload();
      
    });
  } 
 
 
}
