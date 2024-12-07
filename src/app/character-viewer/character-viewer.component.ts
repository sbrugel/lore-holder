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
import { CharacterLinkCardComponent } from "../character-link-card/character-link-card.component";

@Component({
  selector: 'app-character-viewer',
  imports: [CommonModule, MatButtonModule, MatCardModule, RouterModule, CharacterCardComponent, CharacterLinkCardComponent],
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

  handleRender(character: Character) {
    this.character = character;
    this.subtitleText = [];
    if (this.character) {
      if (this.character.race) this.subtitleText.push(this.character.race);

      if (this.character.age) this.subtitleText.push(this.character.age.toString());

      if (this.character.pronouns) this.subtitleText.push(this.character.pronouns.toString());

      this.detailsService.getAllCustomDetails().subscribe((details: CustomDetail[]) => {
        this.details = details.filter((detail) => this.character!.detailIds.includes(detail.id));
      });

      this.characterLinkService.getCharacterLinks().subscribe((links: CharacterLink[]) => {
        this.characterLinks = links.filter((link) => link.fromId === this.character!.id);
        console.log(this.characterLinks);
      });
    }
  }

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.characterService.getCharacterById(params['id']).subscribe((character) => {
        this.handleRender(character);
      });
    });
  }
}
