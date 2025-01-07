import { CommonModule } from '@angular/common';
import { Component, inject, model } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogModule,
  MatDialogRef,
  MAT_DIALOG_DATA,
} from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { Place } from '../_interfaces/place';

@Component({
  selector: 'place-editor-dialog',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
  ],
  templateUrl: '../_dialogs/place-editor-dialog.html',
  styleUrls: ['../_common/editor-dialog.css'],
})
export class PlaceEditorDialog {
  readonly dialogRef = inject(MatDialogRef<PlaceEditorDialog>);
  data = inject<Place>(MAT_DIALOG_DATA);

  readonly placeName = model(this.data.name);
  readonly placeDescription = model(this.data.description);
  readonly placeAbout = model(this.data.about);
  readonly placePopulation = model(this.data.population);

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
