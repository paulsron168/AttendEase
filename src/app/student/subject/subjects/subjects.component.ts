import { CUSTOM_ELEMENTS_SCHEMA, Component, OnInit} from '@angular/core';
import { CommonModule } from '@angular/common';
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
import { Allsubjects } from './subjects.model';
import { MyProjectsService } from './subjects.service';
import { AuthService } from '@core';
import { ManageRosterService } from 'app/manageRoster/allRoster/manageRoster.service';
import Swal from 'sweetalert2';
import { TodayService } from 'app/teacher/today/today.service';

@Component({
  selector: 'app-myprojects',
  templateUrl: './subjects.component.html',
  styleUrls: ['./subjects.component.scss'],
  standalone: true,
  imports:[CommonModule, BreadcrumbComponent, RouterLink, GoogleMap,
    MatProgressBarModule,
    MatButtonModule,
    MatMenuModule,
    MatIconModule,
    NgScrollbar,],
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class MyProjectsComponent implements OnInit {
  subjects: Allsubjects[] = [];
  classList:any;
  alertList:any;
  subClassList:any;
  dayOfWeek:any;
  currentDate:any;
  onLocation:boolean = false;
  center!: google.maps.LatLngLiteral;
  
  constructor(
    private myProjectsService: MyProjectsService,
    private manageRosterSVC: ManageRosterService,
    private authService:AuthService,
    private todayService:TodayService
    ) {}

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

  setMap(){
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        this.center = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      });

      setTimeout(()=>{
        var polygon1 = [[ 10.332334, 123.934799 ], [ 10.332991, 123.935159 ], [ 10.332144, 123.935815 ], [ 10.331818, 123.935317 ]]; // mandaue foam
        var polygon2 = [[ 10.332215, 123.922561 ], [ 10.330837, 123.922217 ], [ 10.330166, 123.923927 ], [ 10.331336, 123.924265 ]]; // mandaue hiway
        var polygon3 = [[ 10.283007, 123.984853 ], [ 10.283947, 123.986119 ], [ 10.283034, 123.986945 ], [ 10.282152, 123.985502 ]]; //subdivision
        var polygon4 = [[ 10.294203, 123.950874 ], [ 10.294246, 123.951150 ], [ 10.294129, 123.951159 ], [ 10.294103, 123.950891 ], [ 10.294200, 123.950861 ]]; //school
        var pointss = [ this.center.lat, this.center.lng ]

        this.insidePolygon(polygon1,pointss);
        this.insidePolygon(polygon2,pointss);
        this.insidePolygon(polygon3,pointss);
        this.insidePolygon(polygon4,pointss);

      },100);

    } else { 
      console.log("Geolocation is not supported by this browser.");
    }

  }
    
 //start of modal
  PA(roster_id:any,class_start:any) {
    Swal.fire({
      title: 'Enter OTP for attendance',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
        maxLength: '8', // Convert maxLength to a string
      },
      inputValidator: (value) => {
        if (!value || value.length !== 8 ) {
          return 'Please enter a valid 8-digit OTP.';
        }      
        // Return undefined when the input is valid
        return undefined;
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (otp) => {
        // You can perform your OTP validation here
        return new Promise((resolve, reject) => {
          // Placeholder function for OTP validation
          var isValid = true; 
          var roster_pin_id = 0; 

          let q_data = {
            pin: otp,
            roster_date: this.formatDateOnly(new Date()),
            roster_id:roster_id
          };
          // console.log(' checkRosterPin q_data',q_data);
          this.manageRosterSVC.checkRosterPin(q_data)
          .subscribe(
            response => {
              if(response.length == '0'){
                isValid = false;
              } else{
                roster_pin_id = response[0].id
              }
            },
            error => {
              console.error('Error getting section', error);
            }
          );
  
          setTimeout(() => {
            // Placeholder for validation result
            if (isValid) {
              const currentUser = this.authService.currentUserValue;

              const e = new Date();
              // e.setHours(3);
              // e.setMinutes(41);
              // e.setSeconds(1);
              const d = new Date();
              var is_present_variable = 0;
              var check = class_start.split(':');
              d.setHours(check[0]);
              d.setMinutes(check[1]);
              d.setSeconds(check[2]);
    
              var diff_time = (e.getTime()-d.getTime())/1000/60;
              if(diff_time <= 5){
                is_present_variable = 1;
              } else if(diff_time > 5 && diff_time <= 15){
                is_present_variable = 2;
              }
          
              // console.log('now_date',new Date().getTime());
              // console.log('class_start',d.getTime());
              // console.log('diff_time',diff_time);
              // console.log('is_present_variable',is_present_variable);

              let q_data = {
                student_id: currentUser.id,
                roster_pin_id: roster_pin_id,
                updated_by: currentUser.firstName+' '+currentUser.lastName,
                updated_datetime: this.formatDate(new Date()),
                is_present: is_present_variable,
                is_present_datetime: this.formatDate(new Date()),
                is_present_update_display_name: currentUser.firstName+' '+currentUser.lastName,
              }
              // console.log(' updateAttendance q_data',q_data);

              this.todayService.updateAttendanceStudent(q_data)
              .subscribe(
                response => {
                    let w_data = {
                      created_by: currentUser.firstName+' '+currentUser.lastName,
                      created_datetime: this.formatDate(new Date()),
                      updated_by: currentUser.firstName+' '+currentUser.lastName,
                      updated_datetime: this.formatDate(new Date()),
                      student_id: currentUser.id,
                      roster_pin_id: roster_pin_id,
                      remarks: currentUser.firstName+' '+currentUser.lastName + ' responded on his/her attendance',
                    }
                    
                    this.myProjectsService.addResponseFromStudent(w_data)
                    .subscribe(
                      response => {
                        console.log('added response from student');
                      },
                      error => {
                        console.error('Error getting section', error);
                      }
                    );
  
                    this.ngOnInit();
                    console.log('updateAttendance ',response);
                },
                error => {
                  console.error('Error getting Alerts', error);
                }
              );

              resolve(otp);
            } else {
              Swal.fire({
                title: 'Attendance Not Recorded',
                icon: 'error',
                text: 'Your PIN is Invalid.',
              });
            }
          }, 1000);
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        const attendanceOTP = result.value;
        Swal.fire({
          title: 'Attendance Recorded',
          icon: 'success',
          text: 'Your attendance has been successfully recorded.',
          allowOutsideClick: false,
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });
       
      }
    });
  }
  //end of modal
  //ANOTHER MODAL
  FOLA() {
    Swal.fire({
      title: 'Enter OTP for attendance',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
        maxLength: '4', // Convert maxLength to a string
      },
      inputValidator: (value) => {
        if (!value || value.length !== 4 || !/^\d+$/.test(value)) {
          return 'Please enter a valid 4-digit OTP.';
        }
        // Return undefined when the input is valid
        return undefined;
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (otp) => {
        // You can perform your OTP validation here
        return new Promise((resolve, reject) => {
          // Placeholder function for OTP validation
          // You can replace this with your backend API call or any validation logic
          setTimeout(() => {
            const isValid = true; // Placeholder for validation result
            if (isValid) {
              resolve(otp);
            } else {
              reject('Invalid OTP. Please try again.');
            }
          }, 1000);
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        const attendanceOTP = result.value;
        // Handle the submission of attendance OTP here
        // For example, you can make an AJAX request to submit the OTP
        // and handle the response accordingly
        // Placeholder for successful submission response
        // Assuming success here for demonstration
        Swal.fire({
          title: 'Attendance Recorded',
          icon: 'success',
          text: 'Your attendance has been successfully recorded.',
        });
      }
    });
  }
  //END OF MODAL\
  //ANOTHER MODAL
  prog() {
    Swal.fire({
      title: 'Enter OTP for attendance',
      input: 'text',
      inputAttributes: {
        autocapitalize: 'off',
        maxLength: '4', // Convert maxLength to a string
      },
      inputValidator: (value) => {
        if (!value || value.length !== 4 || !/^\d+$/.test(value)) {
          return 'Please enter a valid 4-digit OTP.';
        }
        // Return undefined when the input is valid
        return undefined;
      },
      showCancelButton: true,
      confirmButtonText: 'Submit',
      showLoaderOnConfirm: true,
      preConfirm: (otp) => {
        // You can perform your OTP validation here
        return new Promise((resolve, reject) => {
          // Placeholder function for OTP validation
          // You can replace this with your backend API call or any validation logic
          setTimeout(() => {
            const isValid = true; // Placeholder for validation result
            if (isValid) {
              resolve(otp);
            } else {
              reject('Invalid OTP. Please try again.');
            }
          }, 1000);
        });
      },
      allowOutsideClick: () => !Swal.isLoading(),
    }).then((result) => {
      if (result.isConfirmed) {
        const attendanceOTP = result.value;
        // Handle the submission of attendance OTP here
        // For example, you can make an AJAX request to submit the OTP
        // and handle the response accordingly
        // Placeholder for successful submission response
        // Assuming success here for demonstration
        Swal.fire({
          title: 'Attendance Recorded',
          icon: 'success',
          text: 'Your attendance has been successfully recorded.',
        }).then((result) => {
          if (result.isConfirmed) {
            window.location.reload();
          }
        });

      }
    });
  }
  //END OF MODAL\

  ngOnInit() {
    this.setMap();
    this.getAllSubjects();
    const now = new Date();
    // get the current day of the week
    const daysOfWeek = [
      'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'
    ];
    this.dayOfWeek = daysOfWeek[now.getDay()];
    this.currentDate = now;
  }

  getAllSubjects(): void {
    let s_data = {};
    const currentUser = this.authService.currentUserValue;
    this.myProjectsService.getStudentClass(currentUser.id,s_data)
    .subscribe(
      response => {
        this.subClassList = response;
      },
      error => {
        console.error('Error getting section', error);
      }
    );

    let q_data = {};
    this.myProjectsService.getRosterStudentClassAlerts(currentUser.id,q_data)
    .subscribe(
      response => {
        this.alertList = response;
        this.classList = [];
        this.subClassList.forEach((subclass:any)=>{

          var is_present = 0;
          var is_present_datetime = "";
          var is_present_update_display_name = "";

          this.alertList.forEach((alert:any)=>{
            if(alert.roster_id == subclass.roster_id){
              is_present = alert.is_present;
              is_present_datetime = alert.is_present_datetime;
              is_present_update_display_name = alert.is_present_update_display_name;
            }
           
          });

          var s_data = {
            user_id:subclass.user_id,
            roster_id:subclass.roster_id,
            schedule_id:subclass.schedule_id,
            teacher_id:subclass.teacher_id,
            teacher_name:subclass.teacher_name,
            teacher_profile:subclass.teacher_profile,
            subject_id:subclass.subject_id,
            subjectCode:subclass.subjectCode,
            subject:subclass.subject,
            id_number:subclass.id_number,
            firstname:subclass.firstname,
            middlename:subclass.middlename,
            lastname:subclass.lastname,
            class_days:subclass.class_days,
            class_start:subclass.class_start,
            class_end:subclass.class_end,
            class_room:subclass.class_room,
            last_present:is_present,
            last_present_datetime:is_present_datetime,
            last_present_update_display_name:is_present_update_display_name
          }

          this.classList.push(s_data);
       
        });
        console.log('classList',this.classList);
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

  formatDateOnly(date:any) {
    return date.getFullYear()+'-'+("0" + (date.getMonth()+1)).slice(-2)+ "-" + ("0" + date.getDate()).slice(-2);
  }

  formatTime(time:any) {
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

  convertDateTOTime(date:any) {
    var hours = date.getHours();
    var minutes = date.getMinutes();
    var seconds = date.getSeconds();
    var ampm = hours >= 12 ? 'pm' : 'am';
    hours = hours % 12;
    hours = hours ? hours : 12; // the hour '0' should be '12'
    minutes = minutes < 10 ? '0'+minutes : minutes;
    seconds = seconds < 10 ? '0'+seconds : seconds;
    var strTime =  ("0" + hours).slice(-2) + ':' + minutes + ':' + seconds;
    return strTime;
  }

  checkerTime(time1:any,time2:any,roster_id:any){
    // var currentD = new Date('2024-05-10 09:01:00'); // FOR TESTING
    var currentD = new Date();

    var check1 = time1.split(':');
    var hours1 = check1[0];
    var minutes1 = check1[1];
    var seconds1 = check1[2];

    var check2 = time2.split(':');
    var hours2 = check2[0];
    var minutes2 = check2[1];
    var seconds2 = check2[2];

    var startHappyHourD = new Date();
    startHappyHourD.setHours(hours1,minutes1,seconds1); 
    var endHappyHourD = new Date();
    endHappyHourD.setHours(hours2,minutes2,seconds2); 

    // console.log('console',currentD);
    // console.log('startHappyHourD',startHappyHourD);
    // console.log('endHappyHourD',endHappyHourD);
    if(currentD >= startHappyHourD && currentD < endHappyHourD ){
        return true;
    }else{
        return false;

    }
  }
}