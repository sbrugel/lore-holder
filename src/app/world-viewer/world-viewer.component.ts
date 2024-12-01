import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WorldService } from '../_services/world.service';
import { World } from '../_interfaces/world';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatTabsModule } from '@angular/material/tabs';
import { CharacterService } from '../_services/character.service';
import { Character } from '../_interfaces/character';

@Component({
  selector: 'app-world-viewer',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatTabsModule, RouterModule],
  templateUrl: './world-viewer.component.html',
  styleUrl: './world-viewer.component.css'
})
export class WorldViewerComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  worldService: WorldService = inject(WorldService);
  world: World | undefined;

  characterService: CharacterService = inject(CharacterService);
  characters: Character[] = [];

  constructor() {
    this.world = this.worldService.getWorldById(parseInt(this.route.snapshot.params['id'], 10));
    if (this.world) {
      this.characters = this.characterService.getAllCharacters();
      // filter characters by if their ID is in world's characterIds
      this.characters = this.characters.filter((character) => this.world!.characterIds.includes(character.id));
    }
  }
}
