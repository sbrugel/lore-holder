import { Component, inject, model, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { WorldService } from '../_services/world.service';
import { World } from '../_interfaces/world';
import { WorldCardComponent } from '../world-card/world-card.component';
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';

@Component({
  selector: 'app-world-list',
  imports: [
    CommonModule,
    FormsModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    WorldCardComponent,
  ],
  templateUrl: './world-list.component.html',
  styleUrl: './world-list.component.css',
})
export class WorldListComponent {
  // displayed worlds
  worldList: World[] = [];
  filteredWorldList: World[] = [];
  worldService: WorldService = inject(WorldService);

  // dialog for new world
  readonly dialog = inject(MatDialog);

  readonly newWorldName = signal('');
  readonly newWorldDescription = signal('');
  readonly newWorldDetailedDescription = signal('');
  readonly newWorldImageUrl = signal('');
  readonly newWorldColor = signal('');

  constructor() { }

  ngOnInit() {
    // subscribe to getAllWorlds observable
    this.worldService.getAllWorlds().subscribe((worlds: World[]) => {
      this.worldList = worlds;
      // set filteredWorldList to worldList sorted by name
      this.filteredWorldList = this.worldList.sort((a, b) => a.name.localeCompare(b.name));
    });
  }

  /**
   * Function passed into world-card component to open edit dialog
   * @param world 
   * @returns 
   */
  triggerWorldDialog(world?: World) {
    return () => this.openWorldDialog(world);
  }

  openWorldDialog(world?: World) {
    const dialogRef = this.dialog.open(NewWorldDialog, {
      width: '70%',
      data: world ? {...world} : {
        name: this.newWorldName(),
        description: this.newWorldDescription(),
        detailedDescription: this.newWorldDetailedDescription(),
        imageUrl: this.newWorldImageUrl(),
        color: this.newWorldColor()
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newWorld: World = {
          id: world?.id || '', // if new, will create new one. Or keep if editing
          name: result.worldName(),
          description: result.worldDescription(),
          detailedDescription: result.worldDetailedDescription(),
          imageUrl: result.worldImageUrl(),
          color: result.worldColor(),
          characterIds: world?.characterIds || [],
          placeIds: world?.placeIds || [],
          storyIds: world?.storyIds || []
        }
        
        if (world) {
          // update world
          console.log('update')
          this.worldService.updateWorld(newWorld);
        } else {
          // create new world
          console.log('create')
          this.worldService.createNewWorld(newWorld);
        }
      }
    });
  }

  filterResults(text: string) {
    this.filteredWorldList = this.worldList.filter((world: World) => {
      return world.name.toLowerCase().includes(text.toLowerCase());
    });
  }
}

@Component({
  selector: 'new-world-dialog',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './new-world-dialog.html',
  styleUrls: ['./new-world-dialog.css']
})
export class NewWorldDialog {
  readonly dialogRef = inject(MatDialogRef<NewWorldDialog>);
  data = inject<World>(MAT_DIALOG_DATA);

  readonly worldName = model(this.data.name);
  readonly worldDescription = model(this.data.description);
  readonly worldDetailedDescription = model(this.data.detailedDescription);
  readonly worldImageUrl = model(this.data.imageUrl);
  readonly worldColor = model(this.data.color);

  onNoClick(): void {
    this.dialogRef.close();
  }
}