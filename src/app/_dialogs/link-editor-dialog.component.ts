import { CommonModule } from "@angular/common";
import { Component, inject, signal } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

@Component({
    selector: 'link-editor-dialog',
    imports: [
      CommonModule,
      MatButtonModule,
      MatDialogModule,
      MatInputModule,
      MatSelectModule,
      FormsModule,
      MatFormFieldModule,
    ],
    templateUrl: '../_dialogs/link-editor-dialog.html',
    styleUrls: ['../_common/editor-dialog.css'],
})
export class CharacterLinkEditorDialog {
    readonly dialogRef = inject(MatDialogRef<CharacterLinkEditorDialog>);
    data = inject(MAT_DIALOG_DATA);
    
    readonly linkTo = signal(this.data.toId);
    readonly linkDetails = signal(this.data.details);
    readonly linkType = signal(this.data.relationType);

    readonly allCharacters = signal(this.data._allCharacters);
  
    onNoClick(): void {
      this.dialogRef.close();
    }
}