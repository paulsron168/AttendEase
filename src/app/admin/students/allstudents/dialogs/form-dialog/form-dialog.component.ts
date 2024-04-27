import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose, MatDialog } from '@angular/material/dialog';
import { Component, Inject, ViewChild } from '@angular/core';
import { StudentsService } from '../../students.service';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Students } from '../../students.model';
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
  students: Students;
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
        CommonModule
    ],
})
export class FormDialogComponent {
 
   

  loading: boolean = false;
  action: string;
  dialogTitle: string;
  studentsForm: UntypedFormGroup;
  students: Students;
  dialog: any;
  isReadOnly: boolean = true;
  private _dialogRef: MatDialogRef<UpdateDialogComponent> | undefined; 
  paginator: any;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public studentsService: StudentsService,
    private fb: UntypedFormBuilder,
    private _dialog: MatDialog
   
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.students.First_Name + ' ' +  data.students.Middle_Name + ' ' + data.students.Last_Name;
      this.students = data.students;
    } else {
      this.dialogTitle = 'New Students';
      const blankObject = {} as Students;
      this.students = new Students(blankObject);
    }
    this.studentsForm = this.createContactForm();
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
      ID: [this.students.ID],
      //img: [this.students.img],
      StudentID_Number: [this.students.StudentID_Number],
      Email_Address: [this.students.Email_Address],
      First_Name: [this.students.First_Name],
      Middle_Name: [this.students.Middle_Name],
      Last_Name: [this.students.Last_Name],      
      DOB: [
        formatDate(this.students.DOB, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      Contact_Number: [this.students.Contact_Number], 
      Gender: [this.students.Gender], 
      class_Section: [this.students. class_Section],
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  updateStudent() {
    if (this.studentsForm.valid && this.data && this.data.students) {
      const updatedStudent: Students = this.studentsForm.value;
      updatedStudent.StudentID_Number = this.data.students.StudentID_Number; // Corrected access
      this.studentsService.updateStudent(this.data.students.StudentID_Number, updatedStudent).subscribe({
        next: (val: any) => {
          this.openSuccessDialog('Student information has been successfully Updated!');
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
