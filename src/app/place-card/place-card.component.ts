import { Component, inject, Input } from '@angular/core';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { DeleteConfirmComponent } from '../_common/delete-confirm/delete-confirm.component';
import { Place } from '../_interfaces/place';
import { PlaceService } from '../_services/place.service';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-place-card',
  imports: [MatCardModule, MatButtonModule, MatDialogModule, RouterLink],
  templateUrl: './place-card.component.html',
  styleUrl: './place-card.component.css'
})
export class PlaceCardComponent {
  @Input() place!: Place;
  @Input() editFunction!: any; // function to open edit dialog

  dialog = inject(MatDialog);
  placeService: PlaceService = inject(PlaceService);

  /**
       * Show a dialog for delete confirmation, then delete if confirmed.
       */
  deletePlace() {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '70%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.placeService.deletePlace(this.place.id);
      }
    });
  }
}
