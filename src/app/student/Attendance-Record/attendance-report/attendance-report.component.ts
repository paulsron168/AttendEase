import { Component } from '@angular/core';
import { MatIconModule } from '@angular/material/icon';
import { FormsModule, ReactiveFormsModule, UntypedFormControl, UntypedFormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { TableElement, TableExportUtil } from '@shared';
import { formatDate } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatOptionModule } from '@angular/material/core';
import { CommonModule } from '@angular/common';
import * as XLSX from 'xlsx';

@Component({
  selector: 'app-attendance-report',
  templateUrl: './attendance-report.component.html',
  styleUrl: './attendance-report.component.scss',
  standalone: true,
  imports: [
    BreadcrumbComponent,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    CommonModule,
   
  ],
})

export class AttendanceReportComponent  {
  attendanceForm: UntypedFormGroup;
  dataSource: any;
  
  
  
  // Define the attendance records
  
  
  subjects = [
    { value: 'programming-0', viewValue: 'Programming 2' },
    { value: 'networking-1', viewValue: 'Networking 2' },
    { value: 'fola-2', viewValue: 'FoLa 2' },
    { value: 'SAD', viewValue: 'SAD' }
  ];
  
  constructor() {
    this.attendanceForm = new UntypedFormGroup({
      fromDate: new UntypedFormControl(),
      toDate: new UntypedFormControl(),
    });
  }
  
  // export table data in excel file
  exportToExcel() {
    const element = document.getElementById('attendanceTable');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(element);
    // Iterate over each cell in the worksheet
    for (const cellAddress in ws) {
      if (ws.hasOwnProperty(cellAddress)) {
          const cell = ws[cellAddress];
  
           // Log the cell address and its value to the console
           console.log('Cell Address:', cellAddress);
           console.log('Cell Value:', cell);
  
          // Check if the cell contains an icon and update its value accordingly
          if (cell && cell.t === 's') {
              const cellValue = cell.v as string;
  
              if (cellValue.includes('<span class="far fa-check-circle text-success"></span>')) {
                  ws[cellAddress] = { t: 's', v: 'Present' }; // Replace the icon with 'Present'
              } else if (cellValue.includes('<span class="far fa-times-circle text-danger"></span>')) {
                  ws[cellAddress] = { t: 's', v: 'Absent' }; // Replace the icon with 'Absent'
              }
          }
      }
  }
  
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance Sheet');
    XLSX.writeFile(wb, 'attendance_record.xlsx');
  
    
  }
  
  // Define the interface for attendance records
  }
  