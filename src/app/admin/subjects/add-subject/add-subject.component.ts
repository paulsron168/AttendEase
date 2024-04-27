  import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,
} from '@angular/forms';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';
import { MatButtonModule } from '@angular/material/button';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { CKEditorModule } from '@ckeditor/ckeditor5-angular';
import { MatRadioModule } from '@angular/material/radio';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatDialog } from '@angular/material/dialog';
import { SubjectsService } from '../allsubjects/subjects.service';
import { SuccessDialogComponent } from '../allsubjects/dialog/success-dialog/success-dialog.component';
import { FormControl } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-subject',
  templateUrl: './add-subject.component.html',
  styleUrls: ['./add-subject.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatOptionModule,
    MatDatepickerModule,
    MatRadioModule,
    CKEditorModule,
    FileUploadComponent,
    MatButtonModule,
    CommonModule,
  ],
})
export class AddsubjectsComponent {
  subjectForm: UntypedFormGroup;
  hide3 = true;
  agree3 = false;
  public Editor: any = ClassicEditor;
  year_level: string[] = [
    'First Year',
    'Second Year',
    'Third Year',
    'Fourth Year',
  ];
  //academicLevelControl = new FormControl();

  constructor(private fb: FormBuilder, private subjectService: SubjectsService, private _dialog: MatDialog) {
    this.subjectForm = this.fb.group({
      subjectCode: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      description: ['', [Validators.required]],
      major: ['', [Validators.required]],
      type: ['', [Validators.required]],
      units: ['', [Validators.required]],
      year_level: ['', [Validators.required]],
      
    });

   
  }
  onSubmit() {
    if (this.subjectForm.valid) {
      this.subjectService.addSubject(this.subjectForm.value)
        .subscribe(
          (          response: any) => {
            console.log('Subject added successfully:', response);
            // Optionally, reset the form here
            this.openSuccessDialog('Subject information has been successfully Added!');
            this.subjectForm.reset();
            //this.showNotification('snackbar-success', 'Add Record Successfully...!!!');

          },
          (          error: any) => {
            console.error('Error adding subject:', error);
            // Handle error
          }
        );
    }
  }
  cancel() {
    this.subjectForm.reset(); // Reset form fields
  }

  openSuccessDialog(message: string): void {
    const dialogRef = this._dialog.open(SuccessDialogComponent, {
      width: '300px',
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe((_result: any) => {
      console.log('The dialog was closed');
    });
  }

  
}
