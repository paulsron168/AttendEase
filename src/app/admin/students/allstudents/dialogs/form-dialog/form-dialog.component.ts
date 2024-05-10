import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose, MatDialog } from '@angular/material/dialog';
import { Component, Inject, ViewChild, OnInit } from '@angular/core';
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
export class FormDialogComponent implements OnInit{
 
  sectionList:any;
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
    this.initializeData();
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.students.firstname + ' ' +  data.students.middlename + ' ' + data.students.lastname;
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

  ngOnInit(): void {
   
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
  }

  createContactForm(): UntypedFormGroup {
    return this.fb.group({
      id: [this.students.id],
      //img: [this.students.img],
      id_number: [this.students.id_number],
      email_address: [this.students.email_address],
      firstname: [this.students.firstname],
      middlename: [this.students.middlename],
      lastname: [this.students.lastname],      
      date_of_birth: [
        formatDate(this.students.date_of_birth, 'yyyy-MM-dd', 'en'),
        [Validators.required],
      ],
      contact_number: [this.students.contact_number], 
      gender: [this.students.gender],
      student_class_section: [parseInt(this.students.student_class_section)],
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

  updateStudent() {
    if (this.studentsForm.valid && this.data && this.data.students) {

      let q_data = {
        updated_by: "admin",
        updated_datetime: this.formatDate(new Date()),
        id_number: this.studentsForm.value.id_number,
        firstname: this.studentsForm.value.firstname,
        middlename: this.studentsForm.value.middlename,
        lastname: this.studentsForm.value.lastname,
        gender: this.studentsForm.value.gender,
        contact_number: this.studentsForm.value.contact_number,
        email_address:this.studentsForm.value.email_address,
        date_of_birth: this.studentsForm.value.date_of_birth,
        student_class_section: this.studentsForm.value.student_class_section,
      }

      this.studentsService.updateStudent(this.data.students.id, q_data).subscribe({
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
