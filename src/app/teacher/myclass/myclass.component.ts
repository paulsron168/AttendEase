import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { SafeUrl } from '@angular/platform-browser';
import { GoogleMap } from '@angular/google-maps';
import { MatMenuModule } from '@angular/material/menu';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { RouterLink } from '@angular/router';
import { NgScrollbar } from 'ngx-scrollbar';
import { TodayService } from '../today/today.service';
import { ManageRosterService } from 'app/manageRoster/allRoster/manageRoster.service';
import { Attendance_Record_Component } from '../attendance_record/attendance_record.component';
import { Direction } from '@angular/cdk/bidi';
import { Moment } from 'moment';
import { AuthService } from '@core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-myclass',
  templateUrl: './myclass.component.html',
  styleUrls: ['./myclass.component.scss'],
  standalone: true,
  imports:[CommonModule, BreadcrumbComponent, RouterLink, GoogleMap,
    MatProgressBarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    NgScrollbar,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})

export class MyClassComponent implements OnInit{

  schedules:any;
  scheduleList: any;
  studentList: any;
  dayOfWeek:any;
  currentDate:any;
  roster_pin_id_new:any;
  constructor(
    public dialog: MatDialog,
    public authService:AuthService,
    private todayService:TodayService,
    private rosterService:ManageRosterService) {
    // constructor
  }
  
  PA(roster_id:any,section_id:any) {

  // Function to generate a random 4-digit OTP
  function generateOTP(length:any) {
    // return Math.floor(1000 + Math.random() * 9000).toString();
    let result = '';
    const characters = 'abcdefghijklmnopqrstuvwxyz0123456789';
    const charactersLength = characters.length;
    let counter = 0;
    while (counter < length) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
      counter += 1;
    }
    return result;
  }
  
  let otp_generated = generateOTP(8);

  Swal.fire({
    title: 'Your OTP for attendance',
    html: `
      <h1 style="color:blue">${otp_generated}</h1>
    `,
    showCancelButton: true,
    confirmButtonText: 'send',
    showLoaderOnConfirm: true,
    preConfirm: () => {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          
          let q_data = {
            created_by: "admin",
            created_datetime: this.formatDate(new Date()),
            updated_by: "admin",
            updated_datetime: this.formatDate(new Date()),
            roster_id: roster_id,
            roster_date: this.formatDate(new Date()),
            pin: otp_generated,
            is_pin_available: 1
          };

          this.rosterService.addRosterPin(q_data).subscribe({
            next: (val: any) => {
              this.roster_pin_id_new = val.insertId;
            },
            error: (err: any) => {
              console.error(err);
            },
          });
        }, 1000);

        setTimeout(() => {

          let q_data = {};
          this.todayService.getStudentsPerSection(section_id,q_data).subscribe({
            next: (val: any) => {
                let s_data:any = [];
                val.forEach((value:any)=>{
                  let e_data = {
                    created_by: "admin",
                    created_datetime: this.formatDate(new Date()),
                    updated_by: "admin",
                    updated_datetime: this.formatDate(new Date()),
                    roster_id: roster_id,
                    roster_pin_id: this.roster_pin_id_new,
                    student_id: value.id
                  };

                  this.rosterService.addRosterPinAlerts(e_data).subscribe({
                    next: (val: any) => {
                      
                    },
                    error: (err: any) => {
                      console.error(err);
                    },
                  });
                }); 

                this.initializeData();
                Swal.fire({
                  title: 'Send Successfully',
                  icon: 'success',
                  text: 'Your attendance has been successfully send.',
                });
            },
            error: (err: any) => {
              console.error(err);
            },
          });
        }, 2000);
      });
    },
  })
  }
    
  //end of modal
  //ANOTHER MODAL
  FOLA(){
    // Function to generate a random 4-digit OTP
    function generateOTP() {
      return Math.floor(1000 + Math.random() * 9000).toString();
    }

    const otp = generateOTP(); // Generate OTP

    Swal.fire({
      title: 'Your OTP for attendance',
      html: `
        <input type="text" id="otp1" maxlength="1" size="1" readonly value="${otp[0]}">
        <input type="text" id="otp2" maxlength="1" size="1" readonly value="${otp[1]}">
        <input type="text" id="otp3" maxlength="1" size="1" readonly value="${otp[2]}">
        <input type="text" id="otp4" maxlength="1" size="1" readonly value="${otp[3]}">
      `,
      showCancelButton: true,
      confirmButtonText: 'send',
      showLoaderOnConfirm: true,
      preConfirm: () => {
        return new Promise((resolve, reject) => {
          setTimeout(() => {
            const isValid = true; // Placeholder for validation result
            if (isValid) {
            
            }
          }, 1000);
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire({
          title: 'Send Successfully',
          icon: 'success',
          text: 'Your attendance has been successfully send.',
        });
      }
    });
  }

  //END OF MODAL
  ngOnInit() {
    this.initializeData();
    const now = new Date();
    // get the current day of the week
    const daysOfWeek = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    this.dayOfWeek = daysOfWeek[now.getDay()];
    this.currentDate = now;
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

  initializeData(){

    const currentUser = this.authService.currentUserValue;

    let q_data = {};
    
    this.todayService.getStudentsPerTeacher(currentUser.id,q_data)
    .subscribe(
      response => {
        this.studentList = response;
      },
      error => {
        console.error('Error getting section', error);
      }
    );

    this.todayService.getTeacherClass(currentUser.id,q_data)
    .subscribe(
      response => {
        this.schedules = response;
        this.scheduleList = [];
        this.schedules.forEach((sched:any) => {

          var present = 0;
          var late = 0;
          var absent = 0
    
          this.studentList.forEach((stud:any) => {
            if(sched.id == stud.roster_id && sched.last_attendance_id == stud.roster_pin_id){
              if(stud.is_present == 0){
                absent++;
              } else if(stud.is_present == 1){
                present++;
              } else if(stud.is_present == 2){
                late++;
              }
            }
          });

          let s_data = {
            id:sched.id,
            schedule_id:sched.schedule_id,
            section:sched.section,
            section_id:sched.section_id,
            subject_major:sched.subject_major,
            subject_name:sched.subject_name,
            subject_type:sched.subject_type,
            subject_units:sched.subject_units,
            teacher_id:sched.teacher_id,
            teacher_name:sched.teacher_name,
            class_days:sched.class_days,
            class_end:sched.class_end,
            class_start:sched.class_start,
            last_attendance_datetime:sched.last_attendance_datetime,
            last_attendance_id:sched.last_attendance_id,
            last_attendance_pin:sched.last_attendance_pin,
            count_present: present,
            count_late: late,
            count_absent: absent
          }
          
          this.scheduleList.push(s_data);
        });

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
    minutes = minutes < 10 ? '0'+minutes : minutes;
    var strTime =  ("0" + hours).slice(-2) + ':' + minutes + ':' + seconds;
    return date.getFullYear()+'-'+("0" + (date.getMonth()+1)).slice(-2)+ "-" + ("0" + date.getDate()).slice(-2) + " " + strTime;
  }

  current_attendance(roster_pin_id:any){
    let tempDirection: Direction;

    const dialogRef = this.dialog.open(Attendance_Record_Component, {
      width: "1000px",
      height: "700px",
      data: {
        roster_pin_id: roster_pin_id,
        action: 'add',
      }
    });
    
    dialogRef.afterClosed().subscribe((_result: any) => {
      this.initializeData();
    });
  }

  /*getAllSubjects(): void {
    this.myProjectsService.getAllSubjects().subscribe((data: Allsubjects[]) => {
      this.subjects = data;
    });
  }*/

//MODAL CODE
 /* openAttendanceDialog(): void {
    const dialogRef = this.dialog.open(AttendanceDialogComponent, {
      width: '250px', // Set the width of your dialog
      // Add any other configuration options as needed
    });

    dialogRef.afterClosed().subscribe(result => {
      // Add any logic to handle the dialog closing if needed
    });
  }*/
  //END OF MODAL CODE

}
