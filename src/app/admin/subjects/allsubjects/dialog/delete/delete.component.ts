import { MAT_DIALOG_DATA, MatDialogRef, MatDialogTitle, MatDialogContent, MatDialogActions, MatDialogClose } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { SubjectsService} from '../../subjects.service';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  subjectID: number;
  subjectCode: string;
  subject: string;
  description: string;
  units: string;
  major: string;
  year_level: string;
  type: string;
 
 
}

@Component({
    selector: 'app-delete:not(m)',
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
    public subjectService: SubjectsService
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
        this.subjectService.deleteSubject(this.data.subjectCode).subscribe({
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
}