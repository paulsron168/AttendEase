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
      this.dialogTitle = "Teacher: " + data.teachers.firstname + ' ' +  data.teachers.middlename + ' ' + data.teachers.lastname;
      this.teachers = data.teachers;
      console.log('teachers',this.teachers);
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
      id: [this.teachers.id],
      //img: [this.teachers.img],
      id_number: [this.teachers.id_number],
      email_address: [this.teachers.email_address],
      firstname: [this.teachers.firstname],
      middlename: [this.teachers.middlename],
      lastname: [this.teachers.lastname],      
      date_of_birth: [
        formatDate(this.teachers.date_of_birth, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      contact_number: [this.teachers.contact_number], 
      gender: [this.teachers.gender], 
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
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

  updateTeacher() {
    if (this.teachersForm.valid && this.data && this.data.teachers) {

      let q_data = {
        updated_by: "admin",
        updated_datetime: this.formatDate(new Date()),
        id_number: this.teachersForm.value.id_number,
        firstname: this.teachersForm.value.firstname,
        middlename: this.teachersForm.value.middlename,
        lastname: this.teachersForm.value.lastname,
        gender: this.teachersForm.value.gender,
        contact_number: this.teachersForm.value.contact_number,
        email_address:this.teachersForm.value.email_address,
        date_of_birth: this.teachersForm.value.date_of_birth,
      }
      this.teachersService.updateTeacher(this.data.teachers.id, q_data).subscribe({
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
