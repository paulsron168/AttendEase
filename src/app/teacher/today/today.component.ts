import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { TodayService } from './today.service';
import { HttpClient } from '@angular/common/http';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { DataSource } from '@angular/cdk/collections';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { MatMenuTrigger } from '@angular/material/menu';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Today } from './today.model';
import { TableExportUtil, TableElement } from '@shared';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { NgClass } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { MatSelectModule } from '@angular/material/select';
import { MatIconModule } from '@angular/material/icon';
import { Direction } from '@angular/cdk/bidi';
import { MatDialog } from '@angular/material/dialog';
import { FormDialogComponent } from './form-dialog/form-dialog.component';
import { ManageRosterService } from 'app/manageRoster/allRoster/manageRoster.service';
import { AuthService } from '@core';
import { MatTableDataSource } from '@angular/material/table';
import { FormsModule } from '@angular/forms';
import { Attendance_Record_Component } from '../attendance_record/attendance_record.component';
import { MatButtonModule } from '@angular/material/button';
import { CommonModule } from '@angular/common';
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
    MatSelectModule,
    MatIconModule,
    FormsModule,
    MatButtonModule,
    CommonModule
  ],
})
export class TodayComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  name: any;
  manual: any;

  constructor(
    public httpClient: HttpClient,
    public todayService: TodayService,
    private rosterService:ManageRosterService,
    public dialog: MatDialog,
    private authService:AuthService
    //end
  ) {
    super();
  }
//added
  openDialog(): void {
    // Open the dialog and pass necessary data
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: { name: this.name, manual: this.manual }
    });
    //END

    // Handle dialog closed event if needed
    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }

  refresh() {
    this.loadData();
  }

  editCall(row: Today) {
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        today: row,
        action: 'edit',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        if (foundIndex !== undefined && this.exampleDatabase !== undefined) {
          this.exampleDatabase.dataChange.value[foundIndex] =
            this.todayService.getDialogData();
          // And lastly refresh table
          this.refreshTable();
          this.showNotification(
            'black',
            'Edit Record Successfully...!!!',
            'bottom',
            'center'
          );
        }
      }
    });
  }

  showNotification(arg0: string, arg1: string, arg2: string, arg3: string) {
    throw new Error('Method not implemented.');
  }

  refreshTable() {
    throw new Error('Method not implemented.');
  }

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

  arrayData:any;
  exampleDatabase?: TodayService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Today>(true, []);
  id?: number;
  today?: Today;
  searchKey:string="";

  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;
  @ViewChild(MatMenuTrigger)
  contextMenu?: MatMenuTrigger;
  contextMenuPosition = { x: '0px', y: '0px' };

  ngOnInit() {
    this.loadData();
  }

  toggleStar(row: Today) {
    console.log(row);
  }

  applyFilter(){
    this.arrayData.filter = this.searchKey.trim().toLowerCase();
  }

  exportExcel() {
    // key name with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.arrayData.filteredData.map((x:any) => ({
        RosterID: x.roster_id,
        Subject : x.subject_name,
        StartTime : x.class_start,
        EndTime : x.class_end,
        RosterDate : x.roster_date,
        PIN : x.pin,
        Section : x.section,
        ID: x.id,

      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
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

  public loadData() {

    const currentUser = this.authService.currentUserValue;

    let q_data = {
      id: currentUser.id
    }

    this.rosterService.getRosterPinPerTeacherToday(currentUser.id,q_data)
    .subscribe(
      response => {
    console.log(response);

        this.arrayData = new MatTableDataSource(response);
        this.arrayData.sort = this.sort;
        this.arrayData.paginator = this.paginator;
      },
      error => {
        console.error('Error getting section', error);
      }
    );
  }
}

export class ExampleDataSource extends DataSource<Today> {
  filterChange = new BehaviorSubject('');
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Today[] = [];
  renderedData: Today[] = [];
  constructor(
    public exampleDatabase: TodayService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    // this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Today[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    // this.exampleDatabase.getAllTodays();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((today: Today) => {
            const searchStr = (
              today.id +
              today.updated_by +
              today.updated_datetime +
              today.roster_id +
              today.roster_date +
              today.pin 
            ).toLowerCase();
            return searchStr.indexOf(this.filter.toLowerCase()) !== -1;
          });
        // Sort filtered data
        const sortedData = this.sortData(this.filteredData.slice());
        // Grab the page's slice of the filtered sorted data.
        const startIndex = this.paginator.pageIndex * this.paginator.pageSize;
        this.renderedData = sortedData.splice(
          startIndex,
          this.paginator.pageSize
        );
        return this.renderedData;
      })
    );
  }
  disconnect() {
    //disconnect
  }
  /** Returns a sorted copy of the database data. */
  sortData(data: Today[]): Today[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'updated_by':
          [propertyA, propertyB] = [a.updated_by, b.updated_by];
          break;
        case 'updated_datetime':
          [propertyA, propertyB] = [a.updated_datetime, b.updated_datetime];
          break;
        case 'roster_id':
          [propertyA, propertyB] = [a.roster_id, b.roster_id];
          break;
        case 'roster_date':
          [propertyA, propertyB] = [a.roster_date, b.roster_date];
          break;
        case 'pin':
          [propertyA, propertyB] = [a.pin, b.pin];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }
}
