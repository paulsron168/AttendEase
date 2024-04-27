import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { ErrorStateMatcher, MatRippleModule } from '@angular/material/core';
import { ThemePalette } from '@angular/material/core';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import {
  OwlDateTimeModule,
  OwlNativeDateTimeModule,
} from '@danielmoncada/angular-datetime-picker';
import { MatButtonModule } from '@angular/material/button';
import { TableElement, TableExportUtil, UnsubscribeOnDestroyAdapter } from '@shared';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { FormDialogComponent } from './dialogs/form-dialog/form-dialog.component';
import { MatIconModule } from '@angular/material/icon';

import { BreadcrumbComponent } from '@shared/components/breadcrumb/breadcrumb.component';

import { DataSource, SelectionModel } from '@angular/cdk/collections';
import { MatMenuModule, MatMenuTrigger } from '@angular/material/menu';
import { MatTooltipModule } from '@angular/material/tooltip';
import { DatePipe, NgClass } from '@angular/common';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { FeatherIconsComponent } from '@shared/components/feather-icons/feather-icons.component';
import { MatTableModule } from '@angular/material/table';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';
import { BehaviorSubject, fromEvent, map, merge, Observable } from 'rxjs';
import { ManageRoster } from './manageRoster.model';
import { ManageRosterService } from './manageRoster.service';
import { DDialogComponent } from './dialogs/d-dialog/d-dialog.component';
import { Direction } from '@angular/cdk/bidi';
import { DeleteDialogComponent } from './dialogs/delete/delete.component';

@Component({
  selector: 'app-allRoster',
  templateUrl: './allRoster.component.html',
  styleUrls: ['./allRoster.component.scss'],
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
    OwlDateTimeModule,
    OwlNativeDateTimeModule,
    MatSlideToggleModule,
    MatPaginatorModule,
    MatMenuModule,

  ],
})


export class AllRosterComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit {
  displayedColumns = [
    'select',
    'rosterID',
    'classRoster_ID',
    'major',
    'year_level',
    'class_Section',
    'subjectCode',
    'TeacherID_Number',
    'class_Start',
    'class_End',
    'class_Day',
    'actions',
  ];
  exampleDatabase?: ManageRosterService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<ManageRoster>(true, []);
  index?: number;
  id?: number;
  manageRoster?: ManageRoster;

  private _dialogRef: MatDialogRef<DDialogComponent> | undefined;
  openSuccessDDialog: any;

  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public manageRosterService: ManageRosterService,
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
        manageRoster: this.manageRoster,
        action: 'add',
      },
      direction: tempDirection,
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // After dialog is closed we're doing frontend updates
        // For add we're just pushing a new row inside DataServicex
        this.exampleDatabase?.dataChange.value.unshift(
          this.manageRosterService.getDialogData()
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
  editCall(row: ManageRoster) {
    this.id = row.rosterID;
    let tempDirection: Direction;

    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        roster: row,
        action: 'edit',
      },

    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x) => x.rosterID === this.id
        );
        // Then you update that record using data from dialogData (values you enetered)
        if (foundIndex !== undefined && this.exampleDatabase !== undefined) {
          this.exampleDatabase.dataChange.value[foundIndex] =
            this.manageRosterService.getDialogData();
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
  deleteItem(i: number, row: ManageRoster) {
    this.index = i;
    this.id = row.rosterID;
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
        this.manageRosterService.deleteManageRoster(row.rosterID).subscribe(
          () => {
            // On success, remove the item from the local data array
            const foundIndex = this.exampleDatabase?.dataChange.value.findIndex((x) => x.rosterID === this.id);
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
      const index: number = this.dataSource.renderedData.findIndex(
        (d) => d === item
      );
      // console.log(this.dataSource.renderedData.findIndex((d) => d === item));
      this.exampleDatabase?.dataChange.value.splice(index, 1);

      this.refreshTable();
      this.selection = new SelectionModel<ManageRoster>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }
  public loadData() {
    this.exampleDatabase = new ManageRosterService(this.httpClient);
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
        rosterID: x.rosterID,
        classRoster_ID: x.classRoster_ID,
        major: x.major,
        year_level: x.year_level,
        class_Section: x.class_Section,
        subjectCode: x.subjectCode,
        TeacherID_Number: x.TeacherID_Number,
        class_Start: x.class_Start,
        class_End: x.class_End,
        class_Day: x.class_Day,

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
  onContextMenu(event: MouseEvent, item: ManageRoster) {
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
export class ExampleDataSource extends DataSource<ManageRoster> {
  filterChange = new BehaviorSubject('');
  private _dialog: any;
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: ManageRoster[] = [];
  renderedData: ManageRoster[] = [];
  constructor(
    public exampleDatabase: ManageRosterService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<ManageRoster[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllManageRoster();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((manageRoster: ManageRoster) => {
            const searchStr = (
              manageRoster.rosterID +
              manageRoster.major +
              manageRoster.year_level +
              manageRoster.class_Section +
              manageRoster.subjectCode +
              manageRoster.TeacherID_Number +
              manageRoster.class_Start +
              manageRoster.class_End +
              manageRoster.class_Day

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
  sortData(data: ManageRoster[]): ManageRoster[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'rosterID':
          [propertyA, propertyB] = [a.rosterID, b.rosterID];
          break;
        case 'major':
          [propertyA, propertyB] = [a.major, b.major];
          break;
        case 'year_level':
          [propertyA, propertyB] = [a.year_level, b.year_level];
          break;
        case 'class_Section':
          [propertyA, propertyB] = [a.class_Section, b.class_Section];
          break;
        case 'subjectCode':
          [propertyA, propertyB] = [a.subjectCode, b.subjectCode];
          break;
        case 'TeacherID_Number':
          [propertyA, propertyB] = [a.TeacherID_Number, b.TeacherID_Number];
          break;
        case 'class_Start':
          [propertyA, propertyB] = [a.class_Start, b.class_Start];
          break;
        case 'class_End':
          [propertyA, propertyB] = [a.class_End, b.class_End];
          break;
        case 'class_Day':
          [propertyA, propertyB] = [a.class_Day, b.class_Day];
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
