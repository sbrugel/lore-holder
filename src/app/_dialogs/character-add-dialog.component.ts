import { CommonModule } from "@angular/common";
import { Component, inject, model } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

@Component({
    selector: 'character-add-dialog',
    imports: [
        CommonModule,
        MatButtonModule,
        MatDialogModule,
        MatInputModule,
        MatSelectModule,
        FormsModule,
        MatFormFieldModule,
    ],
    templateUrl: '../_dialogs/character-add-dialog.html',
    styleUrls: ['../_common/editor-dialog.css'],
    })
    export class CharacterAddDialog {
    readonly dialogRef = inject(MatDialogRef<CharacterAddDialog>);
    data = inject(MAT_DIALOG_DATA);

    readonly characterId = model(this.data.characterId);
    readonly allCharacters = model(this.data._allCharacters);

    onNoClick(): void {
        this.dialogRef.close();
    }
}