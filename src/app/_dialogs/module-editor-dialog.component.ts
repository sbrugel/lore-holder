import { CommonModule } from "@angular/common";
import { Component, inject, model } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

@Component({
    selector: 'module-editor-dialog',
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatFormFieldModule,
    ],
    templateUrl: '../_dialogs/module-editor-dialog.html',
    styleUrls: ['../_common/editor-dialog.css'],
})
export class ModuleEditorDialog {
    readonly dialogRef = inject(MatDialogRef<ModuleEditorDialog>);
    data = inject(MAT_DIALOG_DATA);

    readonly moduleType = model(this.data.type);
    readonly moduleContents = model(this.data.content);
    readonly moduleAppearance = model(this.data.appearance);
    readonly moduleColor = model(this.data.color);

    onNoClick(): void {
        this.dialogRef.close();
    }   
}
  