import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { StudentsService } from './students.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';

import { DataSource } from '@angular/cdk/collections';
import {
  MatSnackBar,
  MatSnackBarHorizontalPosition,
  MatSnackBarVerticalPosition,
} from '@angular/material/snack-bar';
import { MatMenuTrigger, MatMenuModule } from '@angular/material/menu';
import { BehaviorSubject, fromEvent, merge, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { DeleteDialogComponent } from './dialogs/delete/delete.component';
import { SelectionModel } from '@angular/cdk/collections';
import { TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter } from '@shared';
import { Direction } from '@angular/cdk/bidi';
//import { TableExportUtil, TableElement } from '@shared';
import { formatDate, NgClass, DatePipe, CommonModule } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatRippleModule } from '@angular/material/core';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';
import { Students } from './students.model';
import { DDialogComponent } from './dialogs/d-dialog/d-dialog.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-allstudents',
  templateUrl: './allstudents.component.html',
  styleUrls: ['./allstudents.component.scss'],
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
    MatMenuModule,
    MatPaginatorModule,
    DatePipe,
    CommonModule
  ],
})
export class AllstudentsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  displayedColumns = [
    'select',
    'id_number',
    'firstname',
    'middlename',
    'lastname',
    'date_of_birth',
    'gender',
    'email_address',
    'contact_number',
    'class_section',
    'id',
    'actions',
  ];
  exampleDatabase?: StudentsService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Students>(true, []);
  index?: number;
  id?: number;
  students?: Students;


  private _dialogRef: MatDialogRef<DDialogComponent> | undefined;
  openSuccessDDialog: any;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public studentsService: StudentsService,
    private snackBar: MatSnackBar
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
        students: this.students,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataServicex
        this.exampleDatabase?.dataChange.value.unshift(
          this.studentsService.getDialogData()
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
  editCall(row: Students) {
    this.id = row.id;
    let tempDirection: Direction;

    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        students: row,
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
        if (foundIndex !== undefined && this.exampleDatabase !== undefined) {
          this.exampleDatabase.dataChange.value[foundIndex] =
            this.studentsService.getDialogData();
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
  deleteItem(i: number, row: Students) {
    this.index = i;
    this.id = row.id;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }

    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      height: '270px',
      width: '300px',
      data: row,
      direction: tempDirection,
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // Call the service method to delete the item from the database
        this.studentsService.deleteStudent(row.id).subscribe(
          () => {
            // On success, remove the item from the local data array
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
      this.studentsService.deleteStudent(item.id).subscribe(
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
        text: 'You were able to delete the students.',
        allowOutsideClick: false,
      }).then((result) => {
        if (result.isConfirmed) {
          window.location.reload();
        }
      });
    },1000);
  }
  public loadData() {
    this.exampleDatabase = new StudentsService(this.httpClient);
    // console.log('exampleDatabase',this.exampleDatabase);
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
        id_number: x.id_number,
        firstname: x.firstname,
        middlename: x.middlename,
        lastname: x.lastname,
        date_of_birth: x.date_of_birth,
        gender: x.gender,
        email_address: x.email_address,
        contact_number: x.contact_number,
        student_class_section: x.student_class_section
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
  // context menu
  onContextMenu(event: MouseEvent, item: Students) {
    event.preventDefault();
    this.contextMenuPosition.x = event.clientX + 'px';
    this.contextMenuPosition.y = event.clientY + 'px';
    if (this.contextMenu !== undefined && this.contextMenu.menu !== null) {
      this.contextMenu.menuData = { item: item };
      this.contextMenu.menu.focusFirstItem('mouse');
      this.contextMenu.openMenu();
    }
  }
}
export class ExampleDataSource extends DataSource<Students> {
  filterChange = new BehaviorSubject('');
  private _dialog: any;
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Students[] = [];
  renderedData: Students[] = [];
  constructor(
    public exampleDatabase: StudentsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Students[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllStudents();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((students: Students) => {
            const searchStr = (
              students.id +
              students.id_number +
              students.email_address +
              students.firstname +
              students.middlename +
              students.lastname +
              students.contact_number +
              students.student_class_section_display
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
    // disconnect
  }
  /** Returns a sorted copy of the database data. */
  sortData(data: Students[]): Students[] {
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
        case 'id_number':
          [propertyA, propertyB] = [a.id_number, b.id_number];
          break;
        case 'email_address':
          [propertyA, propertyB] = [a.email_address, b.email_address];
          break;
        case 'firstname':
          [propertyA, propertyB] = [a.firstname, b.firstname];
          break;
        case 'middlename':
          [propertyA, propertyB] = [a.middlename, b.middlename];
          break;
        case 'lastname':
          [propertyA, propertyB] = [a.lastname, b.lastname];
          break;
        case 'date_of_birth':
          [propertyA, propertyB] = [a.date_of_birth, b.date_of_birth];
          break;
        case 'contact_number':
          [propertyA, propertyB] = [a.contact_number, b.contact_number];
          break;
        case 'gender':
          [propertyA, propertyB] = [a.gender, b.gender];
          break;
        case 'student_class_section':
          [propertyA, propertyB] = [a.student_class_section, b.student_class_section];
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
