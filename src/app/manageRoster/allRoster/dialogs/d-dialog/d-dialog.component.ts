import { MAT_DIALOG_DATA, MatDialogActions, MatDialogClose, MatDialogContent, MatDialogRef, MatDialogTitle } from '@angular/material/dialog';
import { Component, Inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

export interface DialogData {
  message: string;
}
@Component({
  selector: 'app-d-dialog',
  templateUrl: './d-dialog.component.html',
  styleUrl: './d-dialog.component.scss',
  standalone: true,
  imports: [
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatButtonModule,
    MatDialogClose,
  ],
})
export class DDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<DDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  onCloseClick(): void {
    this.dialogRef.close();
  }
}
