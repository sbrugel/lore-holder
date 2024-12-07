import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Character } from '../_interfaces/character';
import { CharacterService } from '../_services/character.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { CustomDetailService } from '../_services/custom-detail.service';
import { CustomDetail } from '../_interfaces/custom-detail';
import { MatButtonModule } from '@angular/material/button';
import { CharacterLinkService } from './../_services/character-link.service';
import { CharacterLink } from '../_interfaces/character-link';
import { CharacterCardComponent } from '../character-card/character-card.component';

@Component({
  selector: 'app-character-viewer',
  imports: [CommonModule, MatButtonModule, MatCardModule, RouterModule, CharacterCardComponent],
  templateUrl: './character-viewer.component.html',
  styleUrl: './character-viewer.component.css'
})
export class CharacterViewerComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  characterService: CharacterService = inject(CharacterService);
  character: Character | undefined;

  detailsService: CustomDetailService = inject(CustomDetailService);
  details: CustomDetail[] = [];

  characterLinkService: CharacterLinkService = inject(CharacterLinkService);
  characterLinks: CharacterLink[] = [];

  subtitleText: string[] = [];

  ngOnInit() {
    // this.route.paramMap.subscribe((params) => {
    //   this.character = this.characterService.getCharacterById(parseInt(this.route.snapshot.params['id'], 10));
    //   this.subtitleText = [];

    //   if (this.character) {
    //     if (this.character.race) this.subtitleText.push(this.character.race);

    //     if (this.character.age) this.subtitleText.push(this.character.age.toString());

    //     if (this.character.pronouns) this.subtitleText.push(this.character.pronouns.toString());

    //     this.details = this.detailsService.getAllCustomDetails().filter((detail) => this.character!.detailIds.includes(detail.id));

    //     this.characterLinks = this.characterLinkService.getCharacterLinks().filter((link) => link.fromId === this.character!.id);
    //   }
    // });
    this.characterService.getCharacterById(this.route.snapshot.params['id']).subscribe((character: Character) => {
      this.character = character;
      this.subtitleText = [];
      if (this.character) {
            if (this.character.race) this.subtitleText.push(this.character.race);

            if (this.character.age) this.subtitleText.push(this.character.age.toString());

            if (this.character.pronouns) this.subtitleText.push(this.character.pronouns.toString());

            // TODO: convert below to use firebase when the time comes
            // this.details = this.detailsService.getAllCustomDetails().filter((detail) => this.character!.detailIds.includes(detail.id));

            // this.characterLinks = this.characterLinkService.getCharacterLinks().filter((link) => link.fromId === this.character!.id);
        }
    });
  }
}
