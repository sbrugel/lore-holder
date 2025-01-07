import { Component, inject } from "@angular/core";
import { MatDialogModule, MAT_DIALOG_DATA } from "@angular/material/dialog";

@Component({
    selector: 'world-card-dialog',
    imports: [MatDialogModule],
    templateUrl: '../_dialogs/world-card-dialog.html',
})
export class WorldCardDialog {
    data = inject(MAT_DIALOG_DATA);
}
  