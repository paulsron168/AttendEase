import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose, MatDialog } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { SubjectsService } from '../../subjects.service';
import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Allsubjects } from '../../allsubjects.model';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { UpdateDialogComponent } from '../update-dialog/update-dialog.component';
import { CommonModule } from '@angular/common';

export interface DialogData {
  id: number;
  action: string;
  allsubjects: Allsubjects;
}

@Component({
    selector: 'app-form-dialog:not(k)',
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
        MatSelectModule,
        MatOptionModule,
        MatDialogClose,
        CommonModule
    ],
})
export class FormDialogComponent {
  action: string;
  dialogTitle: string;
  allsubjectsForm: UntypedFormGroup;
  allsubjects: Allsubjects;
  private _dialogRef: MatDialogRef<UpdateDialogComponent> | undefined; 
  paginator: any;
  year_level: string[] = [
    'First Year',
    'Second Year',
    'Third Year',
    'Fourth Year',
  ];


  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public subjectService: SubjectsService,
    private fb: UntypedFormBuilder,
    private _dialog: MatDialog
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.allsubjects.subjectCode;
      this.allsubjects = data.allsubjects;
    } else {
      this.dialogTitle = 'New Allsubjects';
      const blankObject = {} as Allsubjects;
      this.allsubjects = new Allsubjects(blankObject);
    }
    this.allsubjectsForm = this.createContactForm();
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
      //id: [this.allsubjects.id],
      subjectCode: [this.allsubjects.subjectCode],
      subject: [this.allsubjects.subject],
      description: [this.allsubjects.description],
      units: [this.allsubjects.units],
      major: [this.allsubjects.major],
      type: [this.allsubjects.type],
      year_level: [this.allsubjects ? this.allsubjects.year_level : []]
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
  
  updateSubject() {
    if (this.allsubjectsForm.valid && this.data && this.data.allsubjects) {
      const updatedSubject: Allsubjects = this.allsubjectsForm.value;
      updatedSubject.subjectID = this.data.allsubjects.subjectID; // Corrected access
      this.subjectService.updateSubject(this.data.allsubjects.subjectID, updatedSubject).subscribe({
        next: (val: any) => {
          this.openSuccessDialog('Subject information has been successfully Updated!');
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
