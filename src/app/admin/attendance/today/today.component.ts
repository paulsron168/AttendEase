import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TodayService } from './today.service';
import { TodayService as TodayService2 } from 'app/teacher/today/today.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { MatDialog } from '@angular/material/dialog';
import { MatTableDataSource,MatTableModule  } from '@angular/material/table';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { NgClass } from '@angular/common';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { AuthService } from '@core';
import { DatePipe } from '@angular/common';
import { TableExportUtil, TableElement } from '@shared';
import { ManageRosterService } from 'app/manageRoster/allRoster/manageRoster.service';
import { Attendance_Record_Component } from 'app/teacher/attendance_record/attendance_record.component';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
@Component({
  selector: 'app-today',
  templateUrl: './today.component.html',
  styleUrls: ['./today.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MatTableModule,
    MatSortModule,
    NgClass,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatPaginatorModule, 
    MatIconModule,
    MatButtonModule,
    DatePipe
  ],
})
export class TodayComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  filterToggle = false;
  displayedColumns = [
    'roster_id',
    'subject',
    'class_start',
    'class_end',
    'roster_date',
    'pin',
    'section',
    'id',
    'modal',
  ];

  loading:boolean = false
  exampleDatabase?: TodayService;
  dataSource2: any;
  studentAttendance:any;
  id?: number;

  constructor(
    public httpClient: HttpClient,
    private authService:AuthService,
    public todayService: TodayService,
    public dialog: MatDialog,
    private rosterService: ManageRosterService
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
  }

  loadData() {
    this.loading = true;
    let s_data = {};
    const currentUser = this.authService.currentUserValue;
    this.rosterService.getRosterPinAllTeacherToday(currentUser.id,s_data)
    .subscribe(
      response => {

        this.studentAttendance = response;
        this.dataSource2 = new MatTableDataSource(response);
        this.dataSource2.sort = this.sort;
        this.dataSource2.paginator = this.paginator;
        this.loading = false;
      },
      error => {
        console.error('Error getting section', error);
      }
    );
  }

  formatDate(date:any) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds;
    var strTime =  ("0" + hours).slice(-2) + ':' + minutes + ':' + seconds + ' ' +ampm;
    return date.getFullYear()+'-'+("0" + (date.getMonth()+1)).slice(-2)+ "-" + ("0" + date.getDate()).slice(-2) + " " + strTime;
  }

  current_attendance(roster_pin_id:any){

    const dialogRef = this.dialog.open(Attendance_Record_Component, {
      width: "1000px",
      height: "700px",
      data: {
        roster_pin_id: roster_pin_id,
        action: 'add',
      }
    });
    
    dialogRef.afterClosed().subscribe((_result: any) => {
      this.loadData();
    });
  }


  exportExcel() {
    // key name with space add in brackets
    console.log('this.dataSource2',this.dataSource2.filteredData);
    const exportData: Partial<TableElement>[] =
      this.dataSource2.filteredData.map((x:any) => ({
        StudentName: x.student_name,
        ID_Number : x.id_number,
        Attendance : x.is_present == 2 ? 'Late': x.is_present == 1 ? "Present" : "Absent",
        UpdatedDatime : x.is_present_datetime == null  ? "" :  this.formatDate(new Date(x.is_present_datetime)),
        UpdatedBy : x.is_present_update_display_name,
        ID: x.alert_id,
      }));
  
    TableExportUtil.exportToExcel(exportData, 'excel');
  }
}