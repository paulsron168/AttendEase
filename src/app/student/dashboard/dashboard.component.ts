import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { GoogleMap } from '@angular/google-maps';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { NgScrollbar } from 'ngx-scrollbar';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { Allsubjects } from './dashboard_subject.model';
import { dashboardService } from './dashboard_subject.service';
import { Allclass } from './dashboard_class.model';
import { DashboardClassService } from './dashboard_class.service';
import { Allteachers } from './dashboard_teacher.model';
import { DashboardTeacherService } from './dashboard-teacher.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { number } from 'echarts';
import { SidebarComponent } from 'app/layout/sidebar/sidebar.component';
import { AuthService } from '@core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [CommonModule, BreadcrumbComponent, RouterLink, GoogleMap,
    MatProgressBarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    NgScrollbar,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardComponent implements OnInit {
  [x: string]: SafeUrl;
 
  //Added  
  currentDate: Date = new Date();
  currentDay: string = this.getDayOfWeek(this.currentDate);

    
  // Function to get the day of the week from a Date object
  getDayOfWeek(date: Date): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
  }
//angel

  //Added
  subjects: Allsubjects[] = [];
  class: Allclass[] = [];
  teachers: Allteachers[] = [];

  //location------------------------------------
  zoom = 12;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,
    maxZoom: 20,
    minZoom: 15,
  };
  markers: any[] = [];

  //--TODAY'S CLASS----------------------------------------------------------

  /*classes: any[] = [
    { subject: 'Research 2', time: '9:00 AM - 12:00 AM', yearsection: '3B', days: ['Saturday', 'Sunday'], routerLink: '/research', teacher: 'Mr. Lindo Estrera', teacherProfilePicture: '/assets/images/teacher/estrera.png' },
    { subject: 'Programming 2', time: '8:30 AM - 12:00 PM', yearsection: '3B', days: [ 'Wednesday'], routerLink: '/programming', teacher: 'Mr. Nonito Odjinar', teacherProfilePicture: '/assets/images/teacher/estrera.png' },
    { subject: 'Networking', time: '2:30 PM - 6:00 PM', yearsection: '3B', days: ['Tuesday', 'Thursday'], routerLink: '/networking', teacher: 'Mr. Van Dexter Lachica', teacherProfilePicture: '/assets/images/teacher/estrera.png' },
    { subject: 'System Analysis and Design', time: '9:00 AM - 12:00 AM', yearsection: '3B', days: ['Friday'], routerLink: '/system-analysis-and-design', teacher: 'Mr. Lindo Estrera', teacherProfilePicture: '/assets/images/teacher/estrera.png' },
    { subject: 'FOLA 2', time: '1:00 PM - 2:30 PM', yearsection: '3B', days: [ 'Tuesday','Wednesday'], routerLink: '/FOLA', teacher: 'Mr. Romil Oyao', teacherProfilePicture: '/assets/images/teacher/estrera.png' },
    { subject: 'Industrial Organization and Management', time: '7:00 PM - 8:30 PM', yearsection: '3B', days: ['Monday', 'Wednesday'], routerLink: '/Industrial-Organization-and-Management', teacher: 'Mrs. Rosalina Plaza', teacherProfilePicture: '/assets/images/teacher/estrera.png' },
    { subject: 'Shop Supervision and Training Apprenticeship', time: '7:00 PM - 8:30 PM', yearsection: '3B', days: ['Tuesday', 'Thursday'], routerLink: '/Shop-Supervision-and-Training-Apprenticeship', teacher: 'Mr. Melgarr Sario', teacherProfilePicture: '/assets/images/teacher/estrera.png' },
    { subject: 'Personnel Administration', time: '1:00 PM - 2:30 PM', yearsection: '3B', days: ['Friday'], routerLink: '/personnel-administration', teacher: 'Mr. Eduardson Projemo', teacherProfilePicture: '/assets/images/teacher/estrera.png' },
    // Add more classes as needed
  ];*/

  filteredClasses: any[] = [];
  todayTeacher: string = '';
  
  
  
  

  //calendar-----------------------------------------------------------
  CurrentDate: Date = new Date();
  currentMonth: string = this.currentDate.toLocaleDateString('en-PH', { month: 'long' });
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dates: number[] = [];
 


  //Added 
  constructor(
    private DashboardService: dashboardService,
    private dashboardclassservice: DashboardClassService,
    private dashboardteacherservice: DashboardTeacherService,
    //naenae
    private authService: AuthService,
  ) {
    
  }
  //naenae
  getFullName(): string {
    const currentUser = this.authService.currentUserValue;
    return currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'User Full Name';
  }
  //end naenae
  
  
  
  ngOnInit() {

    //this.filterClassesByDay();
    this.generateDates();
    this.setTodayTeacher();
    //Added  
    //this.getAllSubjects();
    this.getAllclass();
    this.getAllteachers();

    //angel
    //this.updateClass();
    //end

     
    

    //location------------------------------------------------------
    navigator.geolocation.getCurrentPosition((position) => {
      this.center = {
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      };
      this.markers.push({
        position: {
          lat: this.center.lat + ((Math.random() - 0.5) * 2) / 10,
          lng: this.center.lng + ((Math.random() - 0.5) * 2) / 10,
        },
        label: {
          color: 'red',
        },
        title: 'Marker title ' + (this.markers.length + 1),
        options: { animation: google.maps.Animation.BOUNCE },
      });
    });
  }

 

 /* filterClassesByDay(): void {
    const now = new Date();
    const currentDay = now.toLocaleDateString('en-PH', { weekday: 'long' });
    /*  this.filteredClasses = this.classes.filter(classItem => classItem.days.includes(currentDay));
  }*/

  setTodayTeacher(): void {
    const todayClass = this.filteredClasses[0];
    if (todayClass) {
      this.todayTeacher = todayClass.teacher;
    }
  }

  //another ts for calendar
  generateDates() {
    const firstDayOfMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 1).getDay();
    const daysInMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth() + 1, 0).getDate();
    const daysInPrevMonth = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), 0).getDate();

    const daysBefore = Array.from({ length: firstDayOfMonth }, () => -1); // Filling with placeholders for empty days
    const daysCurrentMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const totalDays = daysBefore.length + daysCurrentMonth.length;
    const remainingDays = totalDays % 7 === 0 ? 0 : 7 - totalDays % 7;
    const daysAfter = Array.from({ length: remainingDays }, (_, i) => -1); // Placeholder for empty days

    this.dates = [...daysBefore, ...daysCurrentMonth, ...daysAfter];
  }

  previousMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() - 1);
    this.currentMonth = this.currentDate.toLocaleDateString('en-PH', { month: 'long' });
    this.generateDates();
    //this.updateClass()
  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.currentMonth = this.currentDate.toLocaleDateString('en-PH', { month: 'long' });
    this.generateDates();
    //this.updateClass()
  }

  isCurrentDate(date: number): boolean {
    const today = new Date();
    return this.currentDate.getFullYear() === today.getFullYear() &&
      this.currentDate.getMonth() === today.getMonth() &&
      date === today.getDate();

       
  }


  handleDateClick(date: number) {
    if (date !== -1) {
      //Set the selected date as the new current date
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), date);
      //this.updateClass()
      this.currentDay = this.getDayOfWeek(this.currentDate);
     // this.filteredClasses = this.class.filter(cls => cls.class_Day === this.currentDay);
      
      
    }
  }


//angel
/*updateClass() {
  const daysOfWeek = this.daysOfWeek[this.currentDate.getDay()];
  this.class = this.class.filter(cls => cls.class_Day === daysOfWeek);
}*/

  // Define this function in your component class
 

  //end of calendar

  //Added 
 // getAllSubjects(): void {
 //   this.DashboardService.getAllsubjects().subscribe((data: Allsubjects[]) => {
 //     this.subjects = data;
 //   });
 // }

  //Added  

  /*getAllclass(): void {
    this.dashboardclassservice.getAllclass().subscribe((data: Allclass[]) => {
      this.class = data.filter(cls => cls.class_Day === this.currentDay);
      this.setTodayTeacher()
    });
  }*/
  getAllclass(): void {
    this.dashboardclassservice.getAllclass().subscribe((data: Allclass[]) => {
      console.log('Current Day:', this.currentDay); // Log current day
      this.class = data.filter(cls => {
        console.log('Class Day:', cls.class_Day); // Log class day
        return cls.class_Day.split(',').includes(this.currentDay);
      });
      this.setTodayTeacher();
    });
  }
  

 
  //Added  
  getAllteachers(): void {
    this.dashboardteacherservice.getAllteachers().subscribe((data: Allteachers[]) => {
      this.teachers = data;
    });
  }
}




