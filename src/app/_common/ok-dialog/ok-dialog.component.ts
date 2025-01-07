import { Component, Inject, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatDialogRef, MAT_DIALOG_DATA, MatDialogModule } from '@angular/material/dialog';

@Component({
  selector: 'ok-dialog',
  template: `
    <h1 mat-dialog-title>{{ this.title }}</h1>
    <div mat-dialog-content>{{ this.message }}</div>
    <div mat-dialog-actions>
      <button mat-button (click)="onConfirm()">OK</button>
    </div>
  `,
  imports: [MatButtonModule, MatDialogModule],
})
export class OKDialogComponent {
  constructor(
    public dialogRef: MatDialogRef<OKDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: { title: string; message: string }
  ) {
    this.title = data.title;
    this.message = data.message;
  }

  @Input() title!: string ;
  @Input() message!: string;   

  onConfirm(): void {
    this.dialogRef.close();
  }

  onCancel(): void {
    this.dialogRef.close();
  }
}