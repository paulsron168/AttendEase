import { Component, OnInit } from '@angular/core';
import { NgApexchartsModule, } from 'ng-apexcharts';
import { NgScrollbar } from 'ngx-scrollbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { GoogleMapsModule } from '@angular/google-maps';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { NgClass } from '@angular/common';
import { CommonModule } from '@angular/common'
import { TeachersService } from 'app/admin/teachers/allteachers/teachers.service';
import { AuthService } from '@core';





@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    BreadcrumbComponent,
    MatProgressBarModule,
    NgApexchartsModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    NgScrollbar,
    GoogleMapsModule,
    MatDatepickerModule,
    MatInputModule,
    MatCardModule,
    NgClass,
    CommonModule
  ],
})
export class MainComponent implements OnInit {
  currentDate: Date = new Date();
  currentDay: string = this.getDayOfWeek(this.currentDate);
  getDayOfWeek(date: Date): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
  }
  currentMonth: string = this.currentDate.toLocaleDateString('en-PH', { month: 'long' });
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dates: number[] = [];

  studentCount:number = 0;
  teacherCount:number = 0;


  constructor(
    public teacherService:TeachersService,
    public authService:AuthService
  ) {
    this.generateDates();

  }

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.teacherService.countStudent()
    .subscribe(
      response => {
        this.studentCount = response[0]['count'];
      },
      error => {
        console.error('Error getting section', error);
      }
    );

    this.teacherService.countTeacher()
    .subscribe(
      response => {
        this.teacherCount = response[0]['count'];
      },
      error => {
        console.error('Error getting section', error);
      }
    );
  }

  getFullName(): string {
    const currentUser = this.authService.currentUserValue;
    return currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'User Full Name';
  }

  generateDates() {
    const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();


    const daysBefore = Array.from({ length: firstDayOfMonth }, () => -1); // Filling with placeholders for empty days
    const daysCurrentMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const totalDays = daysBefore.length + daysCurrentMonth.length;
    const remainingDays = totalDays % 7 === 0 ? 0 : 7 - totalDays % 7;
    const daysAfter = Array.from({ length: remainingDays }, (_, i) => -1); // Placeholder for empty days

    this.dates = [...daysBefore, ...daysCurrentMonth, ...daysAfter];
  }


  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1,);
    this.currentMonth = this.currentDate.toLocaleDateString('en-PH', { month: 'long' });
    this.generateDates();
    //this.updateTodaysClasses()
    //this.getAllclass();
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.currentMonth = this.currentDate.toLocaleDateString('en-PH', { month: 'long' });
    this.generateDates();
    //this.updateTodaysClasses()
   
  }

  isCurrentDate(date: number): boolean {
    const today = new Date();
    return this.currentDate.getFullYear() === today.getFullYear() &&
      this.currentDate.getMonth() === today.getMonth() &&
      date === today.getDate();
  }

  handleDateClick(date: number) {
    if (date !== -1) {
      // Set the selected date as the new current date
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), date);
   
    }
  }



  // basic map start
  display?: google.maps.LatLngLiteral;
  center: google.maps.LatLngLiteral = {
    lat: 24,
    lng: 12,
  };
  zoom = 4;
  moveMap(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.center = event.latLng.toJSON();
  }
  move(event: google.maps.MapMouseEvent) {
    if (event.latLng != null) this.display = event.latLng.toJSON();
  }

}
