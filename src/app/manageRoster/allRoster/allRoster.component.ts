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
    'subject_name',
    'subject_major',
    'subject_type',
    'class_days',
    'class_start',
    'class_end',
    'teacher_name',
    'section',
    'rosterID',
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
      width: "700px",
      height: "350px",
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
    this.id = row.id;
    let tempDirection: Direction;

    const dialogRef = this.dialog.open(FormDialogComponent, {
      width: "700px",
      height: "350px",
      data: {
        manageRoster: row,
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
        this.manageRosterService.deleteManageRoster(row.id).subscribe(
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
        id: x.id,
        schedule_id: x.schedule_id,
        subject_name: x.subject_name,
        subject_major: x.subject_major,
        subject_type: x.subject_type,
        class_days: x.class_days,
        class_start: x.class_start,
        class_end: x.class_end,
        teacher_id: x.teacher_id,
        teacher_name: x.teacher_name,
        section: x.section
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
              manageRoster.id +
              manageRoster.schedule_id +
              manageRoster.subject_name +
              manageRoster.subject_major +
              manageRoster.subject_type +
              manageRoster.class_days +
              manageRoster.class_start +
              manageRoster.class_end +
              manageRoster.teacher_id +
              manageRoster.teacher_name +
              manageRoster.section 
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
        case 'id':
          [propertyA, propertyB] = [a.id, b.id];
          break;
        case 'schedule_id':
          [propertyA, propertyB] = [a.schedule_id, b.schedule_id];
          break;
        case 'subject_name':
          [propertyA, propertyB] = [a.subject_name, b.subject_name];
          break;
        case 'subject_major':
          [propertyA, propertyB] = [a.subject_major, b.subject_major];
          break;
        case 'subject_type':
          [propertyA, propertyB] = [a.subject_type, b.subject_type];
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
        case 'teacher_id':
          [propertyA, propertyB] = [a.teacher_id, b.teacher_id];
          break;
        case 'teacher_name':
          [propertyA, propertyB] = [a.teacher_name, b.teacher_name];
          break;
        case 'section':
          [propertyA, propertyB] = [a.section, b.section];
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
