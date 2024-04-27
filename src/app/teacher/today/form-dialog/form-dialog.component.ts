import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';

import { UntypedFormControl, Validators, UntypedFormGroup, UntypedFormBuilder, FormsModule, ReactiveFormsModule, FormBuilder, FormGroup } from '@angular/forms';
import { Today } from '../today.model';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { TodayService } from '../today.service';
import { MatSelectModule } from '@angular/material/select';
export interface DialogData {
  name: string;
  manual: string;
  img: string;
  
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
    MatSelectModule
  ],
})
export class FormDialogComponent {
  public confirmAdd(): void {
    this.todayService.addstudent(this.studentForm.getRawValue());
  }
  studentForm: FormGroup;
  element: any;

  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: FormBuilder,
    private todayService: TodayService
  ) {
    this.studentForm = this.fb.group({
      name: ['', Validators.required],
      manual: ['', Validators.required]
    });
  }

  submit() {
  
  }
 

  onNoClick(): void {
    this.dialogRef.close();
  }

  confirmedit(): void {
    this.todayService.addstudent(this.studentForm.value);
    this.dialogRef.close();
  }
}
