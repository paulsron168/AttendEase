import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose, MatDialog } from '@angular/material/dialog';
import { Component, Inject, ViewChild } from '@angular/core';
import { ManageRosterService } from '../../manageRoster.service';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ManageRoster } from '../../manageRoster.model';
import { formatDate } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';


export interface DialogData {
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
export class FormDialogComponent {
  loading: boolean = false;
  action: string;
  dialogTitle: string;
  manageRosterForm: UntypedFormGroup;
  manageRoster: ManageRoster;
  dialog: any;
  isReadOnly: boolean = true;
  private _dialogRef: MatDialogRef<UpdateDialogComponent> | undefined;
  paginator: any;

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
    private _dialog: MatDialog

  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.manageRoster.rosterID + ' ' + data.manageRoster.classRoster_ID;
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
  getErrorMessage() {
    return this.formControl.hasError('required')
      ? 'Required field'
      : this.formControl.hasError('email')
        ? 'Not a valid email'
        : '';
  }
  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      rosterID: [this.manageRoster.rosterID],
      //img: [this.manageRoster.img],
      classRoster_ID: [this.manageRoster.classRoster_ID],
      major: [this.manageRoster.major],
      year_level: [this.manageRoster.year_level],
      class_Section: [this.manageRoster.class_Section],
      subjectCode: [this.manageRoster.subjectCode],
      TeacherID_Number: [this.manageRoster.TeacherID_Number],
      class_Start: [this.manageRoster.class_Start],
      class_End: [this.manageRoster.class_End],
      class_Day: [this.manageRoster.class_Day],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  updateManageRoster() {
    if (this.manageRosterForm.valid && this.data && this.data.manageRoster) {
      const updatedManageRoster: ManageRoster = this.manageRosterForm.value;
      updatedManageRoster.classRoster_ID = this.data.manageRoster.classRoster_ID; // Corrected access
      this.manageRosterService.updateManageRoster(this.data.manageRoster.classRoster_ID, updatedManageRoster).subscribe({
        next: (val: any) => {
          this.openSuccessDialog('Manage Class Roster information has been successfully Updated!');
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
