import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgScrollbar } from 'ngx-scrollbar';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
@Component({
  selector: 'app-attendance_record',
  templateUrl: './attendance_record.component.html',
  styleUrls: ['./attendance_record.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    NgScrollbar,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
  ],
})
export class Attendance_Record_Component {
  code: string[] = ['', '', '', ''];
  apiUrl = 'http://localhost:3000';
  showCode: boolean = false;

  constructor(private http: HttpClient) {
    // constructor
  }

  generateCode(): void {
    for (let i = 0; i < 4; i++) {
      this.code[i] = this.generateRandomDigit();
    }
    this.showCode = true;
  }

  async checkLocationAndSend(): Promise<void> {
    const locationAllowed = await this.requestLocationPermission();
    if (locationAllowed) {
      // Check if location is within parameters
      const locationValid = this.checkLocation();
      if (locationValid) {
        // Location is valid, send notification
        this.sendNotification();
      } else {
        alert('Error! Your location is not within the specified parameters.');
      }
    } else {
      alert('Error! Location permission denied.');
    }
  }

  async requestLocationPermission(): Promise<boolean> {
    // Logic to request location permission
    // This can be implemented using the Geolocation API or a third-party library
    // For demonstration purposes, assuming permission is always granted
    return true;
  }

  checkLocation(): boolean {
    // Logic to check if location is within specified parameters
    // For demonstration purposes, assuming location is always valid
    return true;
  }

  async sendNotification(): Promise<void> {
    if (this.checkConnection()) {
      await this.saveCode(this.code.join('')); // Save code to the database
      this.showSuccessMessage();
    } else {
      this.showErrorMessage();
    }
  }

  async saveCode(code: string): Promise<void> {
    try {
      const response = await this.http.post<any>(`${this.apiUrl}/save-code`, { code }).toPromise();
      console.log(response); // Log success message or handle accordingly
    } catch (error) {
      console.error('Error saving code:', error);
      alert('Error saving code. Please try again later.');
    }
  }

  generateRandomDigit(): string {
    return Math.floor(Math.random() * 10).toString();
  }

  checkConnection(): boolean {
    // Logic to check network connection
    return true; // Change this based on actual connection status
  }

  showSuccessMessage(): void {
    alert('Code sent successfully!');
  }

  showErrorMessage(): void {
    alert('Error! Your connection is poor. Please try again.');
  }
}
