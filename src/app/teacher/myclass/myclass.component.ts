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
//import { Allsubjects } from './my-projects.model';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myclass',
  templateUrl: './myclass.component.html',
  styleUrls: ['./myclass.component.scss'],
  standalone: true,
  imports:[CommonModule, BreadcrumbComponent, RouterLink, GoogleMap,
    MatProgressBarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    NgScrollbar,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MyClassComponent {
  //subjects: Allsubjects[] = [];
  constructor() {
    // constructor
  }
 PA() {
     // Function to generate a random 4-digit OTP
  function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  const otp = generateOTP(); // Generate OTP

  Swal.fire({
    title: 'Your OTP for attendance',
    html: `
      <input type="text" id="otp1" maxlength="1" size="1" readonly value="${otp[0]}">
      <input type="text" id="otp2" maxlength="1" size="1" readonly value="${otp[1]}">
      <input type="text" id="otp3" maxlength="1" size="1" readonly value="${otp[2]}">
      <input type="text" id="otp4" maxlength="1" size="1" readonly value="${otp[3]}">
    `,
    showCancelButton: true,
    confirmButtonText: 'send',
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const isValid = true; // Placeholder for validation result
          if (isValid) {
          
          }
        }, 1000);
      });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Send Successfully',
        icon: 'success',
        text: 'Your attendance has been successfully send.',
      });
    }
  });
}
  
//end of modal
//ANOTHER MODAL
FOLA(){
  // Function to generate a random 4-digit OTP
  function generateOTP() {
    return Math.floor(1000 + Math.random() * 9000).toString();
  }

  const otp = generateOTP(); // Generate OTP

  Swal.fire({
    title: 'Your OTP for attendance',
    html: `
      <input type="text" id="otp1" maxlength="1" size="1" readonly value="${otp[0]}">
      <input type="text" id="otp2" maxlength="1" size="1" readonly value="${otp[1]}">
      <input type="text" id="otp3" maxlength="1" size="1" readonly value="${otp[2]}">
      <input type="text" id="otp4" maxlength="1" size="1" readonly value="${otp[3]}">
    `,
    showCancelButton: true,
    confirmButtonText: 'send',
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          const isValid = true; // Placeholder for validation result
          if (isValid) {
          
          }
        }, 1000);
      });
    },
    allowOutsideClick: () => !Swal.isLoading(),
  }).then((result) => {
    if (result.isConfirmed) {
      Swal.fire({
        title: 'Send Successfully',
        icon: 'success',
        text: 'Your attendance has been successfully send.',
      });
    }
  });
}

//END OF MODAL
  ngOnInit() {
    //this.getAllSubjects();
  }

  /*getAllSubjects(): void {
    this.myProjectsService.getAllSubjects().subscribe((data: Allsubjects[]) => {
      this.subjects = data;
    });
  }*/

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
