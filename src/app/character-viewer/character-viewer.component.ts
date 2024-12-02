import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Character } from '../_interfaces/character';
import { CharacterService } from '../_services/character.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CustomDetailService } from '../_services/custom-detail.service';
import { CustomDetail } from '../_interfaces/custom-detail';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-character-viewer',
  imports: [CommonModule, MatButtonModule, MatCardModule, RouterModule],
templateUrl: './character-viewer.component.html',
  styleUrl: './character-viewer.component.css'
})
export class CharacterViewerComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  characterService: CharacterService = inject(CharacterService);
  character: Character | undefined;

  detailsService: CustomDetailService = inject(CustomDetailService);
  details: CustomDetail[] = [];

  subtitleText: string[] = [];

  constructor() {
    this.character = this.characterService.getCharacterById(parseInt(this.route.snapshot.params['id'], 10));

    if (this.character) {
      if (this.character.race) this.subtitleText.push(this.character.race);

      if (this.character.age) this.subtitleText.push(this.character.age.toString());

      if (this.character.pronouns) this.subtitleText.push(this.character.pronouns.toString());

      this.details = this.detailsService.getAllCustomDetails().filter((detail) => this.character!.detailIds.includes(detail.id));
    }
  }
}
