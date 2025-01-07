import { CommonModule } from "@angular/common";
import { Component, inject, model } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { Character } from "../_interfaces/character";

@Component({
  selector: 'character-editor-dialog',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
  ],
  templateUrl: '../_dialogs/character-editor-dialog.html',
  styleUrls: ['../_common/editor-dialog.css'],
})
export class CharacterEditorDialog {
  readonly dialogRef = inject(MatDialogRef<CharacterEditorDialog>);
  data = inject<Character>(MAT_DIALOG_DATA);

  readonly characterName = model(this.data.name);
  readonly characterDescription = model(this.data.description);
  readonly characterBio = model(this.data.about);
  readonly characterImageUrl = model(this.data.imageUrl);
  readonly characterAge = model(this.data.age);
  readonly characterGender = model(this.data.gender);
  readonly characterRace = model(this.data.race);
  readonly characterPronouns = model(this.data.pronouns);
  readonly characterColors = model(
    this.data.colors ? this.data.colors.join('\n') : ''
  );
  readonly characterGalleryLinks = model(
    this.data.galleryLinks ? this.data.galleryLinks.join('\n') : ''
  );

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