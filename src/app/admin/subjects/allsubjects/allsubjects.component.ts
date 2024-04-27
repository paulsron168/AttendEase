import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import {  SubjectsService } from './subjects.service';
import { HttpClient } from '@angular/common/http';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { Allsubjects } from './allsubjects.model';
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
import { DDialogComponent } from 'app/admin/teachers/allteachers/dialogs/d-dialog/d-dialog.component';

@Component({
  selector: 'app-allsubjects',
  templateUrl: './allsubjects.component.html',
  styleUrls: ['./allsubjects.component.scss'],
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
    CommonModule,
  ],
})
export class AllsubjectsComponent
  extends UnsubscribeOnDestroyAdapter
  implements OnInit
{
  displayedColumns = [
    'select',
    'subjectID',
    'subjectCode',
    'subject',
    'description',
    'units',
    'major',
    'year_level',
    'type',
    'actions',
  ];
  
  
  exampleDatabase?: SubjectsService;
  dataSource!: ExampleDataSource;
  selection = new SelectionModel<Allsubjects>(true, []);
  index?: number;
  subjectID?: number;
  allsubjects?: Allsubjects;

  private _dialogRef: MatDialogRef<DDialogComponent> | undefined;
  openSuccessDDialog: any;
 

  
  constructor(
    public httpClient: HttpClient,
    public dialog: MatDialog,
    public subjectService: SubjectsService,
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
  
  editCall(row: Allsubjects) {
    this.subjectID = row.subjectID;
    let tempDirection: Direction;
    
    const dialogRef = this.dialog.open(FormDialogComponent, {
      data: {
        allsubjects: row,
        action: 'edit',
      },
  
    });
    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // When using an edit things are little different, firstly we find record inside DataService by id
        const foundIndex = this.exampleDatabase?.dataChange.value.findIndex(
          (x) => x.subjectID === this.subjectID
        );
        // Then you update that record using data from dialogData (values you enetered)
        if (foundIndex !== undefined) {
          if (this.exampleDatabase) {
            this.exampleDatabase.dataChange.value[foundIndex] =
              this.subjectService.getDialogData();
          }
          // And lastly refresh table
          this.refreshTable();
         // this.showNotification(
          //  'black',
            //'Edit Record Successfully...!!!',
           // 'bottom',
            //'center'
         // );
        }
      }
    });
  }
  deleteItem(i: number, row: Allsubjects) {
    this.index = i;
    this.subjectID = row.subjectID;
    let tempDirection: Direction;
    if (localStorage.getItem('isRtl') === 'true') {
      tempDirection = 'rtl';
    } else {
      tempDirection = 'ltr';
    }
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      height: '250px',
      width: '300px',
      data: row,
      direction: tempDirection,
    });

    this.subs.sink = dialogRef.afterClosed().subscribe((result) => {
      if (result === 1) {
        // Call the service method to delete the item from the database
        this.subjectService.deleteSubject(row.subjectCode).subscribe(
          () => {
            // On success, remove the item from the local data array
            const foundIndex = this.exampleDatabase?.dataChange.value.findIndex((x) => x.subjectID === this.subjectID);
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
  /** Whether the number of selected elements matches the details number of rows. */
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
      this.selection = new SelectionModel<Allsubjects>(true, []);
    });
    this.showNotification(
      'snackbar-danger',
      totalSelect + ' Record Delete Successfully...!!!',
      'bottom',
      'center'
    );
  }
  public loadData() {
    this.exampleDatabase = new SubjectsService(this.httpClient);
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
        SubjectID:x.subjectID,
        SubjectCode: x.subjectCode,
        Subject: x.subject,
        Description: x.description,
        Major : x.major ,
        Units: x.units,
        Year_level: x.year_level,
        Type: x.type,
        
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
export class ExampleDataSource extends DataSource<Allsubjects> {
  filterChange = new BehaviorSubject('');
  _dialog: any;
  get filter(): string {
    return this.filterChange.value;
  }
  set filter(filter: string) {
    this.filterChange.next(filter);
  }
  filteredData: Allsubjects[] = [];
  renderedData: Allsubjects[] = [];
  constructor(
    public exampleDatabase: SubjectsService,
    public paginator: MatPaginator,
    public _sort: MatSort
  ) {
    super();
    // Reset to the first page when the user changes the filter.
    this.filterChange.subscribe(() => (this.paginator.pageIndex = 0));
  }
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Allsubjects[]> {
    // Listen for any changes in the base data, sorting, filtering, or pagination
    const displayDataChanges = [
      this.exampleDatabase.dataChange,
      this._sort.sortChange,
      this.filterChange,
      this.paginator.page,
    ];
    this.exampleDatabase.getAllAllsubjects();
    return merge(...displayDataChanges).pipe(
      map(() => {
        // Filter data
        this.filteredData = this.exampleDatabase.data
          .slice()
          .filter((allsubjects: Allsubjects) => {
            const searchStr = (
              allsubjects.subjectID +
              allsubjects.subjectCode +
              allsubjects.subject +
              allsubjects.description+
              allsubjects.units +
              allsubjects.major +
              allsubjects.year_level +
              allsubjects.type
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
  sortData(data: Allsubjects[]): Allsubjects[] {
    if (!this._sort.active || this._sort.direction === '') {
      return data;
    }
    return data.sort((a, b) => {
      let propertyA: number | string = '';
      let propertyB: number | string = '';
      switch (this._sort.active) {
        case 'subjectID':
          [propertyA, propertyB] = [a.subjectID, b.subjectID];
          break;
        case 'subjectCode':
          [propertyA, propertyB] = [a.subjectCode, b.subjectCode];
          break;
        case 'subject':
          [propertyA, propertyB] = [a.subject, b.subject];
          break;
        case 'major':
          [propertyA, propertyB] = [a.major, b.major];
          break;
        case 'units':
          [propertyA, propertyB] = [a.units, b.units];
          break;
        case 'year_level':
            [propertyA, propertyB] = [a.year_level, b.year_level];
            break;
        case 'type':
          [propertyA, propertyB] = [a.type, b.type];
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
