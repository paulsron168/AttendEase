import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TodayService } from './today.service';
import { TodayService as TodayService2 } from 'app/teacher/today/today.service';
import { Today } from './today.model';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { NgClass } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { AuthService } from '@core';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-today-attendance',
  templateUrl: './today-attendance.component.html',
  styleUrl: './today-attendance.component.scss',standalone: true,
  imports: [
    BreadcrumbComponent,
    MatTableModule,
    MatSortModule,
    NgClass,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    DatePipe
  ],
})

export class TodayAttendanceComponent  extends UnsubscribeOnDestroyAdapter
implements OnInit
{
filterToggle = false;
displayedColumns = [
  'img',
  'name',
  'time_in',
  'subject',
  'date',
  'status',
  
];
exampleDatabase?: TodayService;
studentAttendance: any;
studentAttendanceList:any;
dataSource2!: any;
dayOfWeek:any;
currentDate:any;
loading:boolean = false;
selection = new SelectionModel<Today>(true, []);
id?: number;
today?: Today;
constructor(
  public httpClient: HttpClient,
  private todayService: TodayService,
  private todayService2: TodayService2,
  private authService:AuthService
) {
  super();
}
@ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
@ViewChild(MatSort, { static: true }) sort!: MatSort;
@ViewChild('filter', { static: true }) filter!: ElementRef;
@ViewChild(MatMenuTrigger)
contextMenu?: MatMenuTrigger;
contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit() {
    this.loadData();

    const now = new Date();
    // get the current day of the week
    const daysOfWeek = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    this.dayOfWeek = daysOfWeek[now.getDay()];
    this.currentDate = now;
  }
  toggleStar(row: Today) {
    console.log(row);
  }

  loadData() {

    this.loading = true;
    let s_data = {};
    const currentUser = this.authService.currentUserValue;
    this.todayService2.getStudentsPerStudent(currentUser.id,s_data)
    .subscribe(
      response => {

        this.studentAttendanceList = response;
        this.studentAttendanceList.forEach((row:any)=>{
          if(row.class_days.includes(this.currentDate)){
            this.studentAttendance.push(row);
          }
        });

        setTimeout(()=>{
          this.dataSource2 = this.studentAttendance;
          this.dataSource2.paginator = this.paginator;
          this.dataSource2.sort = this.sort;
        },1000);
       

        this.loading = false;
      },
      error => {
        console.error('Error getting section', error);
      }
    );
  }
}
