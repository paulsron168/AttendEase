import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose, MatDialog } from '@angular/material/dialog';
import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { CommonModule,formatDate } from '@angular/common';
import { ManageRosterService } from '../../manageRoster.service';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageRoster } from '../../manageRoster.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { TeachersService } from 'app/admin/teachers/allteachers/teachers.service';
import { ClassScheduleService } from 'app/admin/classSchedule/allclassSchedule/classSchedule.service';

export interface DialogData{
  id: number;
  action: string;
  manageRoster: ManageRoster;
}
@Component({
  selector: 'app-form-dialog:not(c)',
  templateUrl: './form-dialog.component.html',
  styleUrls: ['./form-dialog.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
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
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
})
export class FormDialogComponent implements OnInit {
  loading: boolean = false;
  action: string;
  dialogTitle: string;
  manageRosterForm: UntypedFormGroup;
  manageRoster: ManageRoster;
  dialog: any;
  isReadOnly: boolean = true;
  private _dialogRef: MatDialogRef<UpdateDialogComponent> | undefined;
  paginator: any;

  teacherList:any;
  scheduleList:any;

  class_Day: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public manageRosterService: ManageRosterService,
    private fb: UntypedFormBuilder,
    private teacherService: TeachersService,
    private scheduleService: ClassScheduleService,
    private _dialog: MatDialog

  ) {
    // Set the defaults
    console.log('data',data);
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = 'Class Roster [' + data.manageRoster.id + ']';
      this.manageRoster = data.manageRoster;
    } else {
      this.dialogTitle = 'New Manage Class Roster';
      const blankObject = {} as ManageRoster;
      this.manageRoster = new ManageRoster(blankObject);
    }
    this.manageRosterForm = this.createContactForm();
  }
  formControl = new UntypedFormControl('', [
    Validators.required,
    // Validators.email,
  ]);

  ngOnInit():void{
    this.initializeData();
  }

  initializeData(){
    this.teacherService.getTeachers()
    .subscribe(
      response => {
        this.teacherList = response;
      },
      error => {
        console.error('Error getting section', error);
      }
    );

    this.scheduleService.getSchedule()
    .subscribe(
      response => {
        this.scheduleList = response;
      },
      error => {
        console.error('Error getting section', error);
      }
    );
  }

  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      schedule: [this.manageRoster.schedule_id],
      teacher: [this.manageRoster.teacher_id],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }

  addRoster(){
    if (this.manageRosterForm.valid) {
      let q_data = {
        created_by: "admin",
        created_datetime: new Date(),
        updated_by: "admin",
        updated_datetime: new Date(),
        schedule_id: this.manageRosterForm.value.schedule,
        teacher_id: this.manageRosterForm.value.teacher,
      };
      console.log(q_data);

      this.manageRosterService.addRoster(q_data).subscribe({
        next: (val: any) => {
          this.openSuccessDialog('Roster has been successfully added!');
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

   updateManageRoster() {
    if (this.manageRosterForm.valid && this.data && this.data.manageRoster) {
      let q_data = {
        updated_by: "admin",
        updated_datetime: new Date(),
        teacher_id: this.manageRosterForm.value.teacher,
      };

      this.manageRosterService.updateManageRoster(this.data.manageRoster.id, q_data).subscribe({
        next: (val: any) => {
          this.openSuccessDialog('Manage Roster information has been successfully Updated!');
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
