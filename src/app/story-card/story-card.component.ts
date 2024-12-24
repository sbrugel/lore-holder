import { Component, inject, Input } from '@angular/core';
import { Story } from '../_interfaces/story';
import { MatDialog } from '@angular/material/dialog';
import { StoryService } from './../_services/story.service';
import { DeleteConfirmComponent } from '../_common/delete-confirm/delete-confirm.component';
import { MatListModule } from '@angular/material/list';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-story-card',
  imports: [MatButtonModule, MatListModule, RouterLink],
  templateUrl: './story-card.component.html',
  styleUrl: './story-card.component.css'
})
export class StoryCardComponent {
  @Input() story!: Story;
  @Input() editFunction!: any; // function to open edit dialog

  dialog = inject(MatDialog);
  StoryService = inject(StoryService);

  /**
     * Show a dialog for delete confirmation, then delete if confirmed.
     */
  deleteStory() {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '70%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.StoryService.deleteStory(this.story.id);
      }
    });
  }
}
