import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose, MatDialog } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
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
export class FormDialogComponent  {
  classSection: any[] = [];


  loading: boolean = false;
  action: string;
  dialogTitle: string;
  classScheduleForm: UntypedFormGroup;
  classSchedule: ClassSchedule;
   

  //dialog: any;
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
    public classScheduleService: ClassScheduleService,
    private fb: UntypedFormBuilder,
    private _dialog: MatDialog,
        
  ) {
    // Set the defaults
    this.action = data.action;
    if (this.action === 'edit') {
      this.dialogTitle = data.classSchedule.ID + ' '  ;
      this.classSchedule = data.classSchedule;
    } else {
      this.dialogTitle = 'New ClassSchedule';
      const blankObject = {} as ClassSchedule;
      this.classSchedule = new ClassSchedule(blankObject);
    }
    this.classScheduleForm = this.createContactForm();
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
      ID: [this.classSchedule.ID],
      class_ID: [this.classSchedule.class_ID],
      class_Day: [this.classSchedule.class_Day],
      class_Start: [this.classSchedule.class_Start],
      class_End: [this.classSchedule.class_End],
      class_Section: [this.classSchedule.class_Section],
      room: [this.classSchedule.room],
      
    
      
    });
  }
  submit() {
    // emppty stuff
  }
  onNoClick(): void {
    this.dialogRef.close();
  }
   
  updateClassSchedule() {
    if (this.classScheduleForm.valid && this.data && this.data.classSchedule) {
      const updatedClassSchedule: ClassSchedule = this.classScheduleForm.value;
      updatedClassSchedule.ID = this.data.classSchedule.ID; // Corrected access
      this.classScheduleService.updateClassSchedule(this.data.classSchedule.ID, updatedClassSchedule).subscribe({
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
