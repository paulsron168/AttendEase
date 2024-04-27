import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { SafeUrl } from '@angular/platform-browser';
import { GoogleMap } from '@angular/google-maps';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { Allsubjects } from './subjects.model';
import { MyProjectsService } from './subjects.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myprojects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
  standalone: true,
  imports:[CommonModule, BreadcrumbComponent, RouterLink, GoogleMap,
    MatProgressBarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    NgScrollbar,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyProjectsComponent implements OnInit {
  subjects: Allsubjects[] = [];

  constructor(private myProjectsService: MyProjectsService) {}
 //start of modal
  PA() {
    Swal.fire({
      title: 'Enter OTP for attendance',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
        maxLength: '4', // Convert maxLength to a string
      },
      inputValidator: (value) => {
        if (!value || value.length !== 4 || !/^\d+$/.test(value)) {
          return 'Please enter a valid 4-digit OTP.';
        }
        // Return undefined when the input is valid
        return undefined;
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (otp) => {
        // You can perform your OTP validation here
        return new Promise((resolve, reject) => {
          // Placeholder function for OTP validation
          // You can replace this with your backend API call or any validation logic
          setTimeout(() => {
            const isValid = true; // Placeholder for validation result
            if (isValid) {
              resolve(otp);
            } else {
              reject('Invalid OTP. Please try again.');
            }
          }, 1000);
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        const attendanceOTP = result.value;

        Swal.fire({
          title: 'Attendance Recorded',
          icon: 'success',
          text: 'Your attendance has been successfully recorded.',
        });
      }
    });
}
//end of modal
//ANOTHER MODAL
FOLA() {
  Swal.fire({
    title: 'Enter OTP for attendance',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off',
      maxLength: '4', // Convert maxLength to a string
    },
    inputValidator: (value) => {
      if (!value || value.length !== 4 || !/^\d+$/.test(value)) {
        return 'Please enter a valid 4-digit OTP.';
      }
      // Return undefined when the input is valid
      return undefined;
    },
    showCancelButton: true,
    confirmButtonText: 'Submit',
    showLoaderOnConfirm: true,
    preConfirm: (otp) => {
      // You can perform your OTP validation here
      return new Promise((resolve, reject) => {
        // Placeholder function for OTP validation
        // You can replace this with your backend API call or any validation logic
        setTimeout(() => {
          const isValid = true; // Placeholder for validation result
          if (isValid) {
            resolve(otp);
          } else {
            reject('Invalid OTP. Please try again.');
          }
        }, 1000);
      });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      const attendanceOTP = result.value;
      // Handle the submission of attendance OTP here
      // For example, you can make an AJAX request to submit the OTP
      // and handle the response accordingly
      // Placeholder for successful submission response
      // Assuming success here for demonstration
      Swal.fire({
        title: 'Attendance Recorded',
        icon: 'success',
        text: 'Your attendance has been successfully recorded.',
      });
    }
  });
}
//END OF MODAL\
//ANOTHER MODAL
prog() {
  Swal.fire({
    title: 'Enter OTP for attendance',
    input: 'text',
    inputAttributes: {
      autocapitalize: 'off',
      maxLength: '4', // Convert maxLength to a string
    },
    inputValidator: (value) => {
      if (!value || value.length !== 4 || !/^\d+$/.test(value)) {
        return 'Please enter a valid 4-digit OTP.';
      }
      // Return undefined when the input is valid
      return undefined;
    },
    showCancelButton: true,
    confirmButtonText: 'Submit',
    showLoaderOnConfirm: true,
    preConfirm: (otp) => {
      // You can perform your OTP validation here
      return new Promise((resolve, reject) => {
        // Placeholder function for OTP validation
        // You can replace this with your backend API call or any validation logic
        setTimeout(() => {
          const isValid = true; // Placeholder for validation result
          if (isValid) {
            resolve(otp);
          } else {
            reject('Invalid OTP. Please try again.');
          }
        }, 1000);
      });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      const attendanceOTP = result.value;
      // Handle the submission of attendance OTP here
      // For example, you can make an AJAX request to submit the OTP
      // and handle the response accordingly
      // Placeholder for successful submission response
      // Assuming success here for demonstration
      Swal.fire({
        title: 'Attendance Recorded',
        icon: 'success',
        text: 'Your attendance has been successfully recorded.',
      });
    }
  });
}
//END OF MODAL\

  ngOnInit() {
    this.getAllSubjects();
  }

  getAllSubjects(): void {
    this.myProjectsService.getAllSubjects().subscribe((data: Allsubjects[]) => {
      this.subjects = data;
    });
  }

//MODAL CODE
 /* openAttendanceDialog(): void {
    const dialogRef = this.dialog.open(AttendanceDialogComponent, {
      width: '250px', // Set the width of your dialog
      // Add any other configuration options as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      // Add any logic to handle the dialog closing if needed
    });
  }*/
  //END OF MODAL CODE
}