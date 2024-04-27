import { Component } from '@angular/core';
import {
  Validators,
  FormsModule,
  ReactiveFormsModule,
  FormGroup,
  FormBuilder,

} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SettingsService } from './settings.service';
import { MatDialog } from '@angular/material/dialog';
import { FileUploadComponent } from '@shared/components/file-upload/file-upload.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    FileUploadComponent,
    CommonModule,

  ],
})
export class SettingsComponent {


  docForm: FormGroup;
  hide3 = true;
  agree3 = false;
  hide: boolean = true;
  hideConformPassword: boolean = true;

  togglePasswordVisibility(): void {
    this.hide = !this.hide;
  }

  toggleNewPasswordVisibility(): void {
    this.hide = !this.hide;
  }


  constructor(private fb: FormBuilder, private settingsService: SettingsService, private snackBar: MatSnackBar, private _dialog: MatDialog) {
    this.docForm = this.fb.group({
      admin_ID: ['', [Validators.required]],
      password: ['', [Validators.required]],
      new_password: ['', [Validators.required]],
      First_Name: ['', [Validators.required, Validators.pattern('[a-zA-Z]+')]],
      Middle_Name: ['', [Validators.required]],
      Last_Name: ['', [Validators.required]],
      Contact_Number: ['', [Validators.required]],
      Email_Address: ['', [Validators.required, Validators.email, Validators.minLength(5)]],
      uploadImg: [''],
    });
  }

  onSubmit() {
    if (this.docForm.valid) {
      this.settingsService.addSettings(this.docForm.value)
        
    }
  }
}
