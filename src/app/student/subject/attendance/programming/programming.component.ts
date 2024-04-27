import { Component } from '@angular/core';
import Swal from 'sweetalert2';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

@Component({
  selector: 'app-programming',
  templateUrl: './programming.component.html',
  styleUrl: './programming.component.scss',
  standalone: true,
  imports: [BreadcrumbComponent, MatButtonModule],
})
export class ProgrammingComponent {
  constructor() {
    // constructor
  }
  ajaxRequest() {
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

  

}
