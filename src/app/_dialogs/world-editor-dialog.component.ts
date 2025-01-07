import { CommonModule } from "@angular/common";
import { Component, inject, model } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { World } from "../_interfaces/world";

@Component({
    selector: 'world-editor-dialog',
    imports: [
      CommonModule,
      MatButtonModule,
      MatDialogModule,
      MatInputModule,
      FormsModule,
      MatFormFieldModule,
    ],
    templateUrl: '../_dialogs/world-editor-dialog.html',
    styleUrls: ['../_common/editor-dialog.css'],
})
export class WorldEditorDialog {
    readonly dialogRef = inject(MatDialogRef<WorldEditorDialog>);
    data = inject<World>(MAT_DIALOG_DATA);
  
    readonly worldName = model(this.data.name);
    readonly worldDescription = model(this.data.description);
    readonly worldDetailedDescription = model(this.data.detailedDescription);
    readonly worldImageUrl = model(this.data.imageUrl);
    readonly worldColor = model(this.data.color);
  
    onNoClick(): void {
      this.dialogRef.close();
    }
}
  