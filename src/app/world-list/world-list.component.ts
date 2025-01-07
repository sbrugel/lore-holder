import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input';
import { WorldService } from '../_services/world.service';
import { World } from '../_interfaces/world';
import { WorldCardComponent } from '../world-card/world-card.component';
import {
  MatDialog,
  MatDialogModule,
} from '@angular/material/dialog';
import { AuthService } from '../_services/auth.service';
import { WorldEditorDialog } from '../_dialogs/world-editor-dialog.component';

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

  authService: AuthService = inject(AuthService);
  user: any;

  // dialog for new world
  readonly dialog = inject(MatDialog);

  readonly newWorldName = signal('');
  readonly newWorldDescription = signal('');
  readonly newWorldDetailedDescription = signal('');
  readonly newWorldImageUrl = signal('');
  readonly newWorldColor = signal('');

  ngOnInit() {
    // subscribe to getAllWorlds observable
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
      this.worldService.getAllWorlds(this.user).subscribe((worlds: World[]) => {
        this.worldList = worlds;
        // set filteredWorldList to worldList sorted by name
        this.filteredWorldList = this.worldList.sort((a, b) =>
          a.name.localeCompare(b.name)
        );
      });
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
    const dialogRef = this.dialog.open(WorldEditorDialog, {
      width: '70%',
      data: world
        ? { ...world }
        : {
            name: this.newWorldName(),
            description: this.newWorldDescription(),
            detailedDescription: this.newWorldDetailedDescription(),
            imageUrl: this.newWorldImageUrl(),
            color: this.newWorldColor(),
          },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newWorld: World = {
          id: world?.id || '', // if new, will create new one. Or keep if editing
          ownerId: world?.ownerId || this.user.uid, // if new, will create new one. Or keep if editing
          name: result.worldName(),
          description: result.worldDescription(),
          detailedDescription: result.worldDetailedDescription(),
          imageUrl: result.worldImageUrl(),
          color: result.worldColor(),
          characterIds: world?.characterIds || [],
          placeIds: world?.placeIds || [],
          storyIds: world?.storyIds || [],
        };

        if (world) {
          // update world
          this.worldService.updateWorld(newWorld);
        } else {
          // create new world
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

