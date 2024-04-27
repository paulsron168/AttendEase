import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose, MatDialog } from '@angular/material/dialog';
import { Component, Inject, ViewChild } from '@angular/core';
import { TeachersService } from '../../teachers.service';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule, FormGroup } from '@angular/forms';
import { Teachers } from '../../teachers.model';
import { CommonModule, formatDate } from '@angular/common';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';


export interface DialogData {
  id: number;
  action: string;
  teachers: Teachers;
  
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
        CommonModule,
        
    ],
})
export class FormDialogComponent {
 
  loading: boolean = false;
  action: string;
  dialogTitle: string;
  teachersForm: UntypedFormGroup;
  teachers: Teachers;
  dialog: any;
  isReadOnly: boolean = true;
  private _dialogRef: MatDialogRef<UpdateDialogComponent> | undefined; 
  paginator: any;
  
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public teachersService: TeachersService,
    private fb: UntypedFormBuilder,
    private _dialog: MatDialog
   
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.teachers.First_Name + ' ' +  data.teachers.Middle_Name + ' ' + data.teachers.Last_Name;
      this.teachers = data.teachers;
    } else {
      this.dialogTitle = 'New Teachers';
      const blankObject = {} as Teachers;
      this.teachers = new Teachers(blankObject);
    }
    this.teachersForm = this.createContactForm();
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
      ID: [this.teachers.ID],
      //img: [this.teachers.img],
      TeacherID_Number: [this.teachers.TeacherID_Number],
      Email_Address: [this.teachers.Email_Address],
      First_Name: [this.teachers.First_Name],
      Middle_Name: [this.teachers.Middle_Name],
      Last_Name: [this.teachers.Last_Name],      
      DOB: [
        formatDate(this.teachers.DOB, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      Contact_Number: [this.teachers.Contact_Number], 
      Gender: [this.teachers.Gender], 
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  updateTeacher() {
    if (this.teachersForm.valid && this.data && this.data.teachers) {
      const updatedTeacher: Teachers = this.teachersForm.value;
      updatedTeacher.TeacherID_Number = this.data.teachers.TeacherID_Number; // Corrected access
      this.teachersService.updateTeacher(this.data.teachers.TeacherID_Number, updatedTeacher).subscribe({
        next: (val: any) => {
          this.openSuccessDialog('Teacher information has been successfully Updated!');
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
