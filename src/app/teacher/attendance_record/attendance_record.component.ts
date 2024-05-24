import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose, MatDialog } from '@angular/material/dialog';
import { Component, Inject, ViewChild, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { NgScrollbar } from 'ngx-scrollbar';
import { MatDividerModule } from '@angular/material/divider';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { CommonModule } from '@angular/common';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatTableDataSource,MatTableModule  } from '@angular/material/table';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { EditAttendanceComponent } from '../edit-attendance/edit-attendance.component';
import { TableExportUtil, TableElement } from '@shared';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { ManageRosterService } from 'app/manageRoster/allRoster/manageRoster.service';
import * as moment from 'moment';

export interface DialogData{
  roster_pin_id: number;
  action: string;
}

@Component({
  selector: 'app-attendance_record',
  templateUrl: './attendance_record.component.html',
  styleUrls: ['./attendance_record.component.scss'],
  standalone: true,
  imports: [
    NgScrollbar,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatButtonModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    MatTableModule,
    FeatherIconsComponent
  ],
})
export class Attendance_Record_Component implements OnInit {
  code: string[] = ['', '', '', ''];
  apiUrl = 'http://localhost:3000';
  showCode: boolean = false;
  loading:boolean = false;
  select_source:any;
  roster_pin_id:any;
  
  displayedColumns = [
    'select',
    'student_id',
    'student_name',
    'id_number',
    'is_present',
    'is_present_datetime',
    'is_present_update_display_name',
    'id',
    'actions'
  ];

  constructor(
    public dialogRef: MatDialogRef<Attendance_Record_Component>,
    private http: HttpClient,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private rosterService:ManageRosterService,
    private dialog:MatDialog) {
    this.roster_pin_id = data.roster_pin_id
    // constructor
  }

  ngOnInit(): void {
  
    this.initializeData();
  }

  addDateTimeHours(date:any){
    var convertDate = date;

    if(date != null){
      let h = 12;
      convertDate = new Date(date);
      convertDate.setTime(convertDate.getTime() - (h*60*60*1000));
    } else{
      convertDate = null;
    }

    return convertDate;
   
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

  
  convertDateTOTimeAMPM(date:any) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds;
    var strTime =  ("0" + hours).slice(-2) + ':' + minutes + ' ' + ampm;
    return strTime;
  }

  exportExcel() {
    // key name with space add in brackets
    console.log('this.select_source',this.select_source.filteredData);
    const exportData: Partial<TableElement>[] =
      this.select_source.filteredData.map((x:any) => ({
        StudentName: x.student_name,
        ID_Number : x.id_number,
        Attendance : x.is_present == 2 ? 'Late': x.is_present == 1 ? "Present" : "Absent",
        UpdatedDatime : x.is_present_datetime == null  ? "" :  this.formatDate(new Date(x.is_present_datetime)),
        UpdatedBy : x.is_present_update_display_name,
        ID: x.alert_id,
      }));
  
    TableExportUtil.exportToExcel(exportData, 'excel');
  }
  

  initializeData(){
    let q_data = {
      roster_pin_id: this.roster_pin_id
    }
    this.rosterService.getRosterPinAlertsPerSection(this.roster_pin_id,q_data)
    .subscribe(
      response => {
        this.select_source = new MatTableDataSource(response);
      },
      error => {
        console.error('Error getting section', error);
      }
    );
  }

  generateCode(): void {
    for (let i = 0; i < 4; i++) {
      this.code[i] = this.generateRandomDigit();
    }
    this.showCode = true;
  }

  editAttendance(alert_id:any){
    const dialogRef = this.dialog.open(EditAttendanceComponent, {
      width: "400px",
      height: "300px",
      data: {
        alert_id: alert_id,
        action: 'edit',
      }
    });
    
    dialogRef.afterClosed().subscribe((_result: any) => {
      this.initializeData();
    });
    
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

  close(){
    this.dialogRef.close();
  }

}
