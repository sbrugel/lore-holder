import { Component, Input, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatDialog, MatDialogModule, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { World } from '../_interfaces/world';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-world-card',
  imports: [MatButtonModule, MatCardModule, MatDialogModule, RouterModule],
  templateUrl: './world-card.component.html',
  styleUrl: './world-card.component.css'
})
export class WorldCardComponent {
  @Input() world!: World;

  dialog = inject(MatDialog);

  showFullImage() {
    this.dialog.open(WorldCardDialog, {
      data: { imageUrl: this.world.imageUrl }
    });
  }
}

@Component({
  selector: 'world-card-dialog',
  imports: [MatDialogModule],
  templateUrl: './world-card-dialog.html',
})
export class WorldCardDialog {
  data = inject(MAT_DIALOG_DATA);
}