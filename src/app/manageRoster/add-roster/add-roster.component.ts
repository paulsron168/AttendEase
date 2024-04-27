import { Component } from '@angular/core';
import {
  UntypedFormBuilder,
  UntypedFormGroup,
  Validators,
  FormsModule,
  ReactiveFormsModule,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-add-roster',
  templateUrl: './add-roster.component.html',
  styleUrls: ['./add-roster.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatSelectModule,
    MatOptionModule,
    MatCheckboxModule,
    MatButtonModule,
    OwlDateTimeModule,
    OwlNativeDateTimeModule
  ],
})
export class AddRosterComponent {
  // Form 1
  manageRosterForm: UntypedFormGroup;
  hide = true;
  agree = false;
  public Editor: any = ClassicEditor;
  class_Day: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  constructor(private fb: UntypedFormBuilder) {
    this.  manageRosterForm = this.fb.group({
      classRoster_ID: ['', [Validators.required]],
      major: ['', [Validators.required]],
      year_level: ['',[Validators.required,]],
      class_Section:['',[Validators.required,]],
      subject: ['', [Validators.required]],
      TeacherID_Number: ['', [Validators.required]],
      class_Start: ['', [Validators.required]],
      class_End: ['', [Validators.required]],
      class_Day: ['', [Validators.required]],
      
    });
  }
  onSubmit() {
    console.log('Form Value', this.  manageRosterForm.value);
  }
}
