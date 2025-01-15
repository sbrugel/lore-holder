import { Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { World } from '../_interfaces/world';
import { WorldService } from '../_services/world.service';
import { RouterModule } from '@angular/router';
import { DeleteConfirmComponent } from '../_common/delete-confirm/delete-confirm.component';
import { WorldCardDialog } from '../_dialogs/world-card-dialog.component';
import { handleToastr } from '../_common/commonUtils';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-world-card',
  imports: [MatButtonModule, MatCardModule, MatDialogModule, RouterModule],
  templateUrl: './world-card.component.html',
  styleUrl: './world-card.component.css',
})
export class WorldCardComponent {
  @Input() world!: World;
  @Input() editFunction: any; // passed from world-list; this opens the edit dialog for the world

  dialog = inject(MatDialog);
  worldService: WorldService = inject(WorldService);

  toastr: ToastrService = inject(ToastrService);

  showFullImage() {
    this.dialog.open(WorldCardDialog, {
      data: { imageUrl: this.world.imageUrl },
    });
  }

  /**
   * Show a dialog for delete confirmation, then delete if confirmed.
   */
  deleteWorld() {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '70%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        handleToastr(this.toastr, result, () => this.worldService.deleteWorld(this.world.id), "World deleted successfully!");
      }
    });
  }
}