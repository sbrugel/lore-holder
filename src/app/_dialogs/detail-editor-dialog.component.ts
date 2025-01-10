import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

@Component({
    selector: 'detail-editor-dialog',
    imports: [
      CommonModule,
      MatButtonModule,
      MatDialogModule,
      MatInputModule,
      MatSelectModule,
      FormsModule,
      MatFormFieldModule,
    ],
    templateUrl: '../_dialogs/detail-editor-dialog.html',
    styleUrls: ['../_common/editor-dialog.css'],
})
export class DetailEditorDialog {
    readonly dialogRef = inject(MatDialogRef<DetailEditorDialog>);
    data = inject(MAT_DIALOG_DATA);
  
    readonly detailName = signal(this.data.name);
    readonly detailInputType = signal(this.data.inputType);
    readonly detailContents = signal(this.data.contents);
    readonly detailListContents = signal(this.data.listContents);
  
    onNoClick(): void {
      this.dialogRef.close();
    }
}