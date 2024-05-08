import { MAT_DIALOG_DATA, MatDialogRef, MatDialogContent, MatDialogClose, MatDialog } from '@angular/material/dialog';
import { Component, Inject, ViewChild, OnInit, NgModule } from '@angular/core';
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
import { ManageRosterService } from 'app/manageRoster/allRoster/manageRoster.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { UntypedFormControl, Validators, UntypedFormGroup,FormGroup,FormControl, UntypedFormBuilder, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TodayService } from '../today/today.service';
import { SuccessDialogComponent } from 'app/admin/teachers/allteachers/dialogs/success-dialog/success-dialog.component';
import { AuthService } from '@core';

export interface DialogData{
  alert_id: number;
  action: string;
}

@Component({
  selector: 'app-edit-attendance',
  templateUrl: './edit-attendance.component.html',
  styleUrl: './edit-attendance.component.scss',
  standalone: true,
  imports: [
    NgScrollbar,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatDividerModule,
    MatProgressSpinnerModule,
    CommonModule,
    MatOptionModule,
    MatSelectModule
  ]
})

export class EditAttendanceComponent implements OnInit{

  loading:boolean = false;
  alertID:any;
  docForm: UntypedFormGroup;

  attendanceList = [
    {
      id:0,
      value:'Absent'
    },  
    {
      id:1,
      value:'Present'
    },
    {
      id:2,
      value:'Late'
    }
    
  ]
  
  constructor(
    public dialogRef: MatDialogRef<EditAttendanceComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    private fb: UntypedFormBuilder,
    private _dialog: MatDialog,
    private rosterService:ManageRosterService,
    private todayService:TodayService,
    private authService:AuthService

  ) {
    this.loading = true;
    this.alertID = data.alert_id;

    this.docForm = new FormGroup({
        attendance: new FormControl('', [Validators.required]),
    });

  }


  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    let q_data = {
      alert_id: this.alertID
    }
    this.rosterService.getRosterPinAlertsPerID(this.alertID,q_data)
    .subscribe(
      response => {
        response.forEach((value:any)=>{

          this.docForm = new FormGroup({
            attendance: new FormControl(value.is_present, [Validators.required]), 
          });
    
          this.loading = false;
        });
      },
      error => {
        console.error('Error getting Alerts', error);
      }
    );
  }

  showNotification(arg0: string, arg1: string, arg2: string, arg3: string) {
    throw new Error('Method not implemented.');
  }

  formatDate(date:any) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime =  ("0" + hours).slice(-2) + ':' + minutes + ':' + seconds;
    return date.getFullYear()+'-'+("0" + (date.getMonth()+1)).slice(-2)+ "-" + ("0" + date.getDate()).slice(-2) + " " + strTime;
  }


  submit_change(){

    const currentUser = this.authService.currentUserValue;
    
    this.loading = true;
    let q_data = {
      updated_by: currentUser.firstName+' '+currentUser.lastName,
      updated_datetime: this.formatDate(new Date()),
      is_present: this.docForm.value.attendance,
      is_present_datetime: this.formatDate(new Date()),
      is_present_update_display_name: currentUser.firstName+' '+currentUser.lastName,
    }
    this.todayService.updateAttendance(this.alertID,q_data)
    .subscribe(
      response => {
        
          this.loading = false;
          this.close();
          const dialogRef = this._dialog.open(SuccessDialogComponent, {
            width: '300px',
            data: { message: response.message }
          });
      
      },
      error => {
        console.error('Error getting Alerts', error);
      }
    );
  }

  close(){
    this.dialogRef.close();
  }

}
