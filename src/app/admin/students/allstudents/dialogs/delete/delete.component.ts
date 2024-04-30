import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { StudentsService  } from '../../students.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  id: number;
  id_number: string;
  firstname: string;
 
  
}

@Component({
    selector: 'app-delete:not(c)',
    templateUrl: './delete.component.html',
    styleUrls: ['./delete.component.scss'],
    standalone: true,
    imports: [
        MatDialogTitle,
        MatDialogContent,
        MatDialogActions,
        MatButtonModule,
        MatDialogClose,
    ],
})
export class DeleteDialogComponent {
  dialog: any;
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData,
    public studentsService: StudentsService
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    const dialogRef = this.dialog.open(DeleteDialogComponent, {
      data: this.data // Pass data to the dialog if needed
    });
  
    dialogRef.afterClosed().subscribe((result: boolean) => {
      if (result) {
        this.studentsService.deleteStudent(this.data.id).subscribe({
          next: (result: any) => {
            console.log(result); // Handle the result as needed
            this.dialogRef.close(); // Close the dialog after successful deletion
          },
          error: (error: any) => {
            console.error(error); // Handle the error
            // Optionally, you can display an error message to the user
          },
        });
      }
    });
  
  }
  //confirmDelete(): void {
  //  this.studentsService.deleteStudents(this.data.ID).subscribe({
   //   next: (result: any) => {
   //     console.log(result); // Handle the result as needed
    //    this.dialogRef.close(); // Close the dialog after successful deletion
   //   },
   //   error: (error: any) => {
   //     console.error(error); // Handle the error
   //    // Optionally, you can display an error message to the user
   //   },
  //  });
 // }
}
