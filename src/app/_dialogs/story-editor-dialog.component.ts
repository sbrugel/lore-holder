import { CommonModule } from "@angular/common";
import { Component, inject, model } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { MatButtonModule } from "@angular/material/button";
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { MatSelectModule } from "@angular/material/select";

@Component({
    selector: 'story-editor-dialog',
    imports: [
      CommonModule,
      MatButtonModule,
      MatDialogModule,
      MatInputModule,
      MatSelectModule,
      FormsModule,
      MatFormFieldModule,
    ],
    templateUrl: '../_dialogs/story-editor-dialog.html',
    styleUrls: ['../_common/editor-dialog.css'],
})
export class StoryEditorDialog {
    readonly dialogRef = inject(MatDialogRef<StoryEditorDialog>);
    data = inject(MAT_DIALOG_DATA);
  
    readonly storyTitle = model(this.data.title);
    readonly previousStoryId = model(this.data.previousId);
    readonly nextStoryId = model(this.data.nextId);
  
    readonly allStories = model(this.data._allStories);
  
    onNoClick(): void {
      this.dialogRef.close();
    }
}