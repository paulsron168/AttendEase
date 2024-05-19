import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ClassScheduleService } from './classSchedule.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ClassSchedule } from './classSchedule.model';
import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { FormDialogComponent } from './dialog/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './dialog/delete/delete.component';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { SelectionModel } from '@angular/cdk/collections';
import { UnsubscribeOnDestroyAdapter } from '@shared';
import { Direction } from '@angular/cdk/bidi';
import { TableExportUtil, TableElement } from '@shared';
import { NgClass, DatePipe, CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { DDialogComponent } from './dialog/d-dialog/d-dialog.component';
import {  NgxMaterialTimepickerModule } from 'ngx-material-timepicker';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-allclassSchedule',
  templateUrl: './allclassSchedule.component.html',
  styleUrls: ['./allclassSchedule.component.scss'],
  standalone: true,
  imports: [
    BreadcrumbComponent,
    MatTooltipModule,
    MatButtonModule,
    MatIconModule,
    MatTableModule,
    MatSortModule,
    NgClass,
    MatCheckboxModule,
    FeatherIconsComponent,
    MatRippleModule,
    MatProgressSpinnerModule,
    MatPaginatorModule,
    DatePipe,
    NgxMaterialTimepickerModule,
    CommonModule
  ],
})
export class AllclassScheduleComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'select',
    'class_days',
    'class_start',
    'class_end',
    'class_section',
    'class_subject',
    'class_room',
    'id',
    'actions'
  ];
  exampleDatabase?: ClassScheduleService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<ClassSchedule>(true, []);
  index?: number;
  id?: number;
  classSchedule?: ClassSchedule;

  private _dialogRef: MatDialogRef<DDialogComponent> | undefined;
  openSuccessDDialog: any;

  
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public  classScheduleService: ClassScheduleService,
    private snackBar: MatSnackBar
  ) {
    super();
  }
  @ViewChild(MatPaginator, { static: true }) paginator!: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort!: MatSort;
  @ViewChild('filter', { static: true }) filter!: ElementRef;

  ngOnInit() {
    this.loadData();
  }
  refresh() {
    this.loadData();
  }
  addNew() {
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        classSchedule: this.classSchedule,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataService
        this.exampleDatabase?.dataChange.value.unshift(
          this.classScheduleService.getDialogData()
        );
        this.refreshTable();
        this.showNotification(
          'snackbar-success',
          'Add Record Successfully...!!!',
          'bottom',
          'center'
        );
      }
    });
  }
  editCall(row: ClassSchedule) {
    this.id = row.id;
    let tempDirection: Direction;
    
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        classSchedule: row,
        action: 'edit',
      },
      
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x) => x.id === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        if (foundIndex != null && this.exampleDatabase) {
          this.exampleDatabase.dataChange.value[foundIndex] =
            this.classScheduleService.getDialogData();
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
  deleteItem(i: number, row: ClassSchedule) {
    this.index = i;
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      height: '280px',
      width: '400px',
      data: row,
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        this.classScheduleService.deleteClassSchedule(row.id).subscribe(
          () => {
            const foundIndex = this.exampleDatabase?.dataChange.value.findIndex((x) => x.id === this.id);
            if (foundIndex !== undefined && this.exampleDatabase !== undefined) {
              this.exampleDatabase.dataChange.value.splice(foundIndex, 1);
              // Refresh the table
              this.refreshTable();
              // Show success notification
              //this.showNotification(
              //'snackbar-danger',
              //'Delete Record Successfully...!!!',
              //'bottom',
              // 'center'
              // );

              const dialogRef = this.dialog.open(DDialogComponent, {
                width: '270px',
                data: {

                  message: 'The record has been deleted successfully!.'
                }
              });
            }
          },
          (error) => {
            // Handle error if deletion fails
            console.error('Error deleting record:', error);
          }
        );
      }
    });
  }
  private refreshTable() {
    this.paginator._changePageSize(this.paginator.pageSize);
  }
  /** Whether the number of selected elements matches the total number of rows. */
  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.renderedData.length;
    return numSelected === numRows;
  }

  /** Selects all rows if they are not all selected; otherwise clear selection. */
  masterToggle() {
    this.isAllSelected()
      ? this.selection.clear()
      : this.dataSource.renderedData.forEach((row) =>
          this.selection.select(row)
        );
  }
  removeSelectedRows() {
    const totalSelect = this.selection.selected.length;
    this.selection.selected.forEach((item) => {
      this.classScheduleService.deleteClassSchedule(item.id).subscribe(
        () => {
          
        },
        (error) => {
          // Handle error if deletion fails
          console.error('Error deleting record:', error);
        }
      );
    });
    setTimeout(()=>{
      Swal.fire({
        title: 'Deleted Rows',
        icon: 'success',
        text: 'You were able to delete the schedules.',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },1000);
  }
  public loadData() {
    this.exampleDatabase = new ClassScheduleService(this.httpClient);
    this.dataSource = new ExampleDataSource(
      this.exampleDatabase,
      this.paginator,
      this.sort
    );
    this.subs.sink = fromEvent(this.filter.nativeElement, 'keyup').subscribe(
      () => {
        if (!this.dataSource) {
          return;
        }
        this.dataSource.filter = this.filter.nativeElement.value;
      }
    );
  }

  // export table data in excel file
  exportExcel() {
    // key name with space add in brackets
    const exportData: Partial<TableElement>[] =
      this.dataSource.filteredData.map((x) => ({
        ID: x.id,
        class_days: x.class_days,
        class_start: x.class_start,
        class_end: x.class_end,
        class_room: x.class_room,
        class_section: x.class_section,
        class_subject: x.class_subject,
      }));

    TableExportUtil.exportToExcel(exportData, 'excel');
  }
  showNotification(
    colorName: string,
    text: string,
    placementFrom: MatSnackBarVerticalPosition,
    placementAlign: MatSnackBarHorizontalPosition
  ) {
    this.snackBar.open(text, '', {
      duration: 2000,
      verticalPosition: placementFrom,
      horizontalPosition: placementAlign,
      panelClass: colorName,
    });
  }
}
export class ExampleDataSource extends DataSource<ClassSchedule> {
  filterChange = new BehaviorSubject('');
  private _dialog: any;
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: ClassSchedule[] = [];
  renderedData: ClassSchedule[] = [];
  constructor(
    public exampleDatabase: ClassScheduleService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ClassSchedule[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllClassSchedule();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((classSchedule: ClassSchedule) => {
            const searchStr = (
              classSchedule.id +
              classSchedule.class_days +
              classSchedule.class_start +
              classSchedule.class_end +
              classSchedule.class_section +
              classSchedule.class_subject +
              classSchedule.class_room
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
  sortData(data: ClassSchedule[]): ClassSchedule[] {
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
        case 'class_days':
          [propertyA, propertyB] = [a.class_days, b.class_days];
          break;
        case 'class_start':
          [propertyA, propertyB] = [a.class_start, b.class_start];
          break;
        case 'class_end':
          [propertyA, propertyB] = [a.class_end, b.class_end];
          break;
        case 'class_section':
          [propertyA, propertyB] = [a.class_section, b.class_section];
          break;
        case 'class_subject':
          [propertyA, propertyB] = [a.class_subject, b.class_subject];
          break;
        case 'class_room':
          [propertyA, propertyB] = [a.class_room, b.class_room];
          break;
      }
      const valueA = isNaN(+propertyA) ? propertyA : +propertyA;
      const valueB = isNaN(+propertyB) ? propertyB : +propertyB;
      return (
        (valueA < valueB ? -1 : 1) * (this._sort.direction === 'asc' ? 1 : -1)
      );
    });
  }

  openSuccessDDialog

    (message: string): void {
    const dialogRef = this._dialog.open(DDialogComponent, {
      width: '300px',
      data: { message: message }
    });

    dialogRef.afterClosed().subscribe((_result: any) => {
      console.log('The dialog was closed');
      window.location.reload();

    });
  }
}
