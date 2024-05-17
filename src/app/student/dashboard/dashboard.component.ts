import { Component, OnInit, ViewChild } from '@angular/core';
import { RouterLink } from '@angular/router';
import {
  CdkDragDrop,
  moveItemInArray,
  CdkDropList,
  CdkDrag,
  CdkDragHandle,
  CdkDragPlaceholder,
} from '@angular/cdk/drag-drop';
import {
  ChartComponent,
  ApexAxisChartSeries,
  ApexChart,
  ApexXAxis,
  ApexDataLabels,
  ApexTooltip,
  ApexYAxis,
  ApexPlotOptions,
  ApexStroke,
  ApexLegend,
  ApexNonAxisChartSeries,
  ApexFill,
  ApexGrid,
  ApexResponsive,
  NgApexchartsModule,
} from 'ng-apexcharts';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { CommonModule } from '@angular/common';
import { GoogleMap,MapMarker,MapPolygon } from '@angular/google-maps';
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
import { BrowserModule, DomSanitizer, SafeUrl } from '@angular/platform-browser';
import { number } from 'echarts';
import { SidebarComponent } from 'app/layout/sidebar/sidebar.component';
import { AuthService } from '@core';
import { MyProjectsService } from '../subject/subjects/subjects.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    CommonModule, 
    BreadcrumbComponent, 
    RouterLink, 
    GoogleMap,
    MapMarker,
    MapPolygon,
    MatProgressBarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    NgScrollbar,
    CdkDropList,
    CdkDrag,
    CdkDragHandle
   ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardComponent implements OnInit {
  [x: string]: SafeUrl;
 
  //Added  
  currentDate: Date = new Date();
  currentDay: string = this.getDayOfWeek(this.currentDate);
  getDayOfWeek(date: Date): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
  }

  //Added
  subjects: Allsubjects[] = [];
  class: Allclass[] = [];
  teachers: Allteachers[] = [];

  //location------------------------------------
  zoom = 18;
  center!: google.maps.LatLngLiteral;
  options: google.maps.MapOptions = {
    mapTypeId: 'hybrid',
    zoomControl: true,
    scrollwheel: true,
    disableDoubleClickZoom: true,

  };
  markers: any[] = [];
  polygons: any[] = [];

  vertices: google.maps.LatLngLiteral[] = [
    {lat: 10.332334, lng: 123.934799},
    {lat: 10.332991, lng: 123.935159},
    {lat: 10.332144, lng: 123.935815},
    {lat: 10.331818, lng: 123.935317}
  ];

  vertices1: google.maps.LatLngLiteral[] = [
    {lat: 10.332196, lng: 123.922539},
    {lat: 10.331446, lng: 123.924491},
    {lat: 10.330197, lng: 123.923882},
    {lat: 10.331060, lng: 123.922182}
  ];

  vertices2: google.maps.LatLngLiteral[] = [
    {lat: 10.283007, lng: 123.984853},
    {lat: 10.283947, lng: 123.986119},
    {lat: 10.283034, lng: 123.986945},
    {lat: 10.282152, lng: 123.985502}
  ];

  vertices3: google.maps.LatLngLiteral[] = [
    {lat: 10.294203, lng: 123.950874},
    {lat: 10.294246, lng: 123.951150},
    {lat: 10.294129, lng: 123.951159},
    {lat: 10.294103, lng: 123.950891},
    {lat: 10.294200, lng: 123.950861}
  ];
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
  onLocation:boolean = false;
  currentPosition:any;
  lat:any;
  lng:any;
  classList: any[] = [];
  todayClassList:any[] = [];
  
  //calendar-----------------------------------------------------------
  currentMonth: string = this.currentDate.toLocaleDateString('en-PH', { month: 'long' });
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dates: number[] = [];
 


  //Added 
  constructor(
    private DashboardService: dashboardService,
    private dashboardclassservice: DashboardClassService,
    private dashboardteacherservice: DashboardTeacherService,
    private myProjectsService: MyProjectsService,
    private authService: AuthService,
  ) {
    this.generateDates();
  }

  getFullName(): string {
    const currentUser = this.authService.currentUserValue;
    return currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'User Full Name';
  }

  insidePolygon(polygon:any,point:any) {    

    let odd = false;
    for (let i = 0, j = polygon.length - 1; i < polygon.length; i++) {
        if (((polygon[i][1] > point[1]) !== (polygon[j][1] > point[1])) 
            && (point[0] < ((polygon[j][0] - polygon[i][0]) * (point[1] - polygon[i][1]) / (polygon[j][1] - polygon[i][1]) + polygon[i][0]))) {
            odd = !odd;
        }
        j = i;
    }
    if(odd == true){
      this.onLocation = true;
    }
  };
  
  getTeachers(){
    let s_data = {};
    const currentUser = this.authService.currentUserValue;
    this.myProjectsService.getStudentClass(currentUser.id,s_data)
    .subscribe(
      response => {
        this.classList = response;
        console.log('response',response);
        this.classList.forEach((row:any)=>{
          if(row.class_days.includes(this.currentDay)){
            let s_data = {
              subject: row.subject,
              subjectCode: row.subjectCode,
              teacher_name: row.teacher_name,
              class_days: row.class_days,
              class_start: row.class_start,
              class_end: row.class_end,
              teacher_profile: row.teacher_profile
            };
            this.todayClassList.push(s_data);
          }
        });
      },
      error => {
        console.error('Error getting section', error);
      }
    );

    
  }
  
  formatTimeOnly(time:any) {
    var check = time.split(':');
    var hours = check[0];
    var minutes = check[1];
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime =  ("0" + hours).slice(-2) + ':' + minutes.slice(-2) + ' ' + ampm;
    return strTime;
  }


  ngOnInit() {
    this.generateDates();
    this.setTodayTeacher();
    this.getTeachers();
    this.getAllteachers();
    this.setMap();
  }

  setMap(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });

      setTimeout(()=>{
        this.markers.push({
          position: {
            lat: this.center.lat,
            lng: this.center.lng,
          },
          label: {
            color: 'red',
          },
          title: 'Marker title ' + (this.markers.length + 1),
          options: { animation: google.maps.Animation.BOUNCE },
        });

        var polygon1 = [[ 10.332334, 123.934799 ], [ 10.332991, 123.935159 ], [ 10.332144, 123.935815 ], [ 10.331818, 123.935317 ]]; // mandaue foam
        var polygon2 = [[ 10.332215, 123.922561 ], [ 10.330837, 123.922217 ], [ 10.330166, 123.923927 ], [ 10.331336, 123.924265 ]]; // mandaue hiway
        var polygon3 = [[ 10.283007, 123.984853 ], [ 10.283947, 123.986119 ], [ 10.283034, 123.986945 ], [ 10.282152, 123.985502 ]]; //subdivision
        var polygon4 = [[ 10.294203, 123.950874 ], [ 10.294246, 123.951150 ], [ 10.294129, 123.951159 ], [ 10.294103, 123.950891 ], [ 10.294200, 123.950861 ]]; //school
        var pointss = [ this.center.lat, this.center.lng ]

        this.insidePolygon(polygon1,pointss);
        this.insidePolygon(polygon2,pointss);
        this.insidePolygon(polygon3,pointss);
        this.insidePolygon(polygon4,pointss);

      },1000);

    } else { 
      console.log("Geolocation is not supported by this browser.");
    }

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


    const daysBefore = Array.from({ length: firstDayOfMonth }, () => -1); 
    const daysCurrentMonth = Array.from({ length: daysInMonth }, (_, i) => i + 1);

    const totalDays = daysBefore.length + daysCurrentMonth.length;
    const remainingDays = totalDays % 7 === 0 ? 0 : 7 - totalDays % 7;
    const daysAfter = Array.from({ length: remainingDays }, (_, i) => -1);

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




