import {
  UntypedFormControl,
  UntypedFormGroup,
  Validators,
  FormsModule,
  FormControl,
  ReactiveFormsModule,
  FormBuilder,
} from '@angular/forms';
import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {provideMomentDateAdapter} from '@angular/material-moment-adapter';
import {MatDatepicker, MatDatepickerModule} from '@angular/material/datepicker';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import * as _moment from 'moment';
import {Moment} from 'moment';
import { StudentsService } from 'app/admin/students/allstudents/students.service';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { CommonModule } from '@angular/common';
import { ManageRosterService } from 'app/manageRoster/allRoster/manageRoster.service';
import { TableExportUtil, TableElement } from '@shared';

export const MY_FORMATS = {
  parse: {
    dateInput: 'YYYY-mm-dd',
  },
  display: {
    dateInput: 'MMMM YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};


const moment = _moment;
@Component({
  selector: 'app-attendance-sheet',
  templateUrl: './attendance-sheet.component.html',
  styleUrls: ['./attendance-sheet.component.scss'],
  standalone: true,
  providers: [
    provideMomentDateAdapter(MY_FORMATS),
  ],
  imports: [
    BreadcrumbComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatOptionModule,
    MatSelectModule,
    CommonModule
  ],
})
export class AttendanceSheetComponent implements OnInit{
  attendanceForm: any;
  sectionList:any;
  subjectList:any;
  studentList:any[] = [];
  dayArray:any[] = [];
  dateArray:any[] = [];
  indexArray:any[] = [];
  indexArray2:any[] = [];

  constructor(
    private fb: FormBuilder,
    private studentsService:StudentsService,
    private rosterService:ManageRosterService
    ) {

    this.attendanceForm = this.fb.group({
      fromDate: ['', [Validators.required]],
      subject: ['', [Validators.required]],
      section: ['', [Validators.required]]
    });
  }

  date = new FormControl(moment());

  ngOnInit(): void {
    this.initializeData();
  }

  initializeData(){
    this.studentsService.getSection()
    .subscribe(
      response => {
        this.sectionList = response;
      },
      error => {
        console.error('Error getting section', error);
      }
    );

    this.studentsService.getSubject()
    .subscribe(
      response => {
        this.subjectList = response;
      },
      error => {
        console.error('Error getting section', error);
      }
    );this.studentsService.getSection()
    .subscribe(
      response => {
        this.sectionList = response;
      },
      error => {
        console.error('Error getting section', error);
      }
    );

    this.studentsService.getSubject()
    .subscribe(
      response => {
        this.subjectList = response;
      },
      error => {
        console.error('Error getting section', error);
      }
    );
  }

  setMonthAndYear(normalizedMonthAndYear: Moment, datepicker: MatDatepicker<Moment>) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    // this.date.setValue(ctrlValue);
    this.attendanceForm.controls['fromDate'].setValue(ctrlValue);
    console.log(ctrlValue);
    datepicker.close();
  }

  
  formatDate(date:any) {
    return date.getFullYear()+'-'+("0" + (date.getMonth()+1)).slice(-2)+ "-" + ("0" + date.getDate()).slice(-2);
  }

  groupBy(xs:any, key:any,key2:any) {
    return xs.reduce((rv:any, x:any) => {
    
      if(!this.indexArray2.includes(x[key])){
        let ss = {
          name:x[key],
          profile:x[key2]
        }
        this.indexArray.push(ss);
        this.indexArray2.push(x[key]);
      }
      (rv[x[key]] = rv[x[key]] || []).push(x);
      return rv;
    }, {});
  };
  

  formatDateOnly(date:any) {
    var dates = new Date(date);
    return dates.getFullYear()+'-'+("0" + (dates.getMonth()+1)).slice(-2)+ "-" + ("0" + dates.getDate()).slice(-2);
  }

  formatDayOnly(date:any) {
    var dates = new Date(date);
    return (dates.getDate());
  }

  filterScheduleSectionList(){
    
    let date = new Date(this.attendanceForm.value.fromDate);
    let startmonth = this.formatDate(new Date(date.getFullYear(), date.getMonth(),1));
    let endmonth = this.formatDate(new Date(date.getFullYear(), date.getMonth() + 1, 0));
    let q_data = {

      startmonth: startmonth,
      endmonth: endmonth,
      subject_id: this.attendanceForm.value.subject,
      section_id: this.attendanceForm.value.section,
    }

    this.rosterService.getRosterPinAlertsPerSectionPerSubject(0,q_data)
    .subscribe(
      response => {

        this.dayArray = [];
        this.dateArray = [];
        this.studentList = [];

        var date1 = new Date(startmonth);
        var date2 = new Date(endmonth);
        
        while (date1 <= date2) {
           this.dayArray.push(this.formatDayOnly(date1));
           this.dateArray.push(this.formatDateOnly(date1));
           date1.setDate(date1.getDate() + 1);
        }

        this.studentList = this.groupBy(response, 'student_name','student_profile');

      },
      error => {
        console.error('Error getting section', error);
      }
    );

  }
}
