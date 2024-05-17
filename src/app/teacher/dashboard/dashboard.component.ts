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
import { NgClass } from '@angular/common';
import { MatTooltipModule } from '@angular/material/tooltip';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { NgScrollbar } from 'ngx-scrollbar';
import { MatButtonModule } from '@angular/material/button';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { GoogleMapsModule } from '@angular/google-maps'
import { CommonModule } from '@angular/common'
import { Allclass } from './dashboard.model';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core'
import { DashboardClassService } from './dashboard.service';
import { SafeUrl } from '@angular/platform-browser';
import { AuthService } from '@core';
import { TodayService } from '../today/today.service';

export type chartOptions = {
  series: ApexAxisChartSeries;
  radialseries: ApexNonAxisChartSeries;
  series2: ApexNonAxisChartSeries;
  chart: ApexChart;
  dataLabels: ApexDataLabels;
  plotOptions: ApexPlotOptions;
  yaxis: ApexYAxis;
  xaxis: ApexXAxis;
  fill: ApexFill;
  tooltip: ApexTooltip;
  grid: ApexGrid;
  stroke: ApexStroke;
  legend: ApexLegend;
  colors: string[];
  responsive: ApexResponsive[];
  labels: string[];
};

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    NgApexchartsModule,
    MatButtonModule,
    NgScrollbar,
    CdkDropList,
    CdkDrag,
    CdkDragHandle,
    MatIconModule,
    MatCheckboxModule,
    CdkDragPlaceholder,
    MatTooltipModule,
    NgClass,
    GoogleMapsModule,
    CommonModule,
    RouterLink
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class DashboardComponent implements OnInit {
  [x: string]: SafeUrl;

  @ViewChild('chart')
  chart!: ChartComponent;
  public barChartOptions!: Partial<chartOptions>;
  public radialChartOptions!: Partial<chartOptions>;
  public gaugeChartOptions!: Partial<chartOptions>;
  public stackBarChart!: Partial<chartOptions>;
 
  //Added  
  currentDate: Date = new Date();
  currentDay: string = this.getDayOfWeek(this.currentDate);
  getDayOfWeek(date: Date): string {
    const daysOfWeek = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    return daysOfWeek[date.getDay()];
  }
  class: any[] = [];
  //todaysClasses: any[] = [];
  //location----------------------------------
  zoom = 12
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

  //-------------------------------------------------------------
  currentUser:any;
  //calendar-----------------------------------------------------------

  currentMonth: string = this.currentDate.toLocaleDateString('en-PH', { month: 'long' });
  daysOfWeek: string[] = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  dates: number[] = [];
  studentList:any[] = [];
  cnt_absent:number = 0;
  cnt_present:number = 0;
  cnt_late:number = 0;
  cnt_total:number = 0;
  absent_percentage:number = 0;
  present_percentage:number = 0;
  late_percentage:number = 0;
  //----------------------------------------------------------------------------

  constructor(
    private DashboardClassService: DashboardClassService,
    private authService: AuthService,
    private todayService:TodayService) {
    this.generateDates();
 
  }
  ngOnInit() {

    this.setMap();
    this.chart2();
    this.initializeData();
  }

  initializeData(){

    let q_data = {};
    this.currentUser = this.authService.currentUserValue;

    this.todayService.getTeacherClass(this.currentUser.id,q_data)
    .subscribe(
      response => {
        var classes = response;
        console.log('classes',classes);
        classes.forEach((row:any) =>{
            if(row.class_days.includes(this.currentDay)){
              let s_data = {
                subject_name: row.subject_name,
                subject_major: row.subject_major,
                class_start: row.class_start,
                class_end: row.class_end,
                section: row.section,
                class_days: row.class_days,
                subject_type: row.subject_type
              };
              this.class.push(s_data);
            }
         
          }
        );
          console.log('this.class',this.class);
          
      
      },
      error => {
        console.error('Error getting section', error);
      }
    );

    this.todayService.getStudentsPerTeacher(this.currentUser.id,q_data)
    .subscribe(
      response => {
        this.studentList = response;
        this.studentList.forEach((row:any)=>{
          if(row.is_present == 0){
            this.cnt_absent++;
          } else if(row.is_present == 1){
            this.cnt_present++;
          } else if(row.is_present == 2){
            this.cnt_late++;
          } 
          this.cnt_total++;
        });

        this.absent_percentage = (this.cnt_absent / this.cnt_total) * 100;
        this.present_percentage = (this.cnt_present / this.cnt_total) * 100;
        this.late_percentage = (this.cnt_late / this.cnt_total) * 100;
      },
      error => {
        console.error('Error getting section', error);
      }
    );
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

      },1000);

    } else { 
      console.log("Geolocation is not supported by this browser.");
    }
  }

  //naenae
  getFullName(): string {
    const currentUser = this.authService.currentUserValue;
    return currentUser ? `${currentUser.firstName} ${currentUser.lastName}` : 'User Full Name';
  }
  
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
    this.currentDate.setMonth(this.currentDate.getMonth() - 1,);
    this.currentMonth = this.currentDate.toLocaleDateString('en-PH', { month: 'long' });
    this.generateDates();


  }

  nextMonth() {
    this.currentDate.setMonth(this.currentDate.getMonth() + 1);
    this.currentMonth = this.currentDate.toLocaleDateString('en-PH', { month: 'long' });
    this.generateDates();
  


  }

  isCurrentDate(date: number): boolean {
    const today = new Date();
    return this.currentDate.getFullYear() === today.getFullYear() &&
      this.currentDate.getMonth() === today.getMonth() &&
      date === today.getDate();
  }

  handleDateClick(date: number) {
    if (date !== -1) {
      this.currentDate = new Date(this.currentDate.getFullYear(), this.currentDate.getMonth(), date);
 
   
    }
  }

  //CHART------------------------------------------------------------------------

  private chart2() {

    setTimeout(()=>{
      this.radialChartOptions = {
        radialseries: [+this.absent_percentage.toFixed(0),+this.present_percentage.toFixed(0), +this.late_percentage.toFixed(0)],
        chart: {
          height: 250,
          type: 'radialBar',
        },
        plotOptions: {
          radialBar: {
            dataLabels: {
              name: {
                fontSize: '22px',
              },
              value: {
                fontSize: '18px',
              },
  
            },
          },
        },
        labels: ['Absent', 'Present', 'Late'],
      };
    },1000);
   
  }
  //END CHART--------------------------------------------------------


}
