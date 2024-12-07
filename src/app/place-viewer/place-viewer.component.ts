import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Character } from '../_interfaces/character';
import { CharacterService } from '../_services/character.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PlaceService } from '../_services/place.service';
import { Place } from '../_interfaces/place';
import { CharacterCardComponent } from "../character-card/character-card.component";

@Component({
  selector: 'app-place-viewer',
  imports: [CommonModule, MatButtonModule, MatCardModule, RouterModule, CharacterCardComponent],
  templateUrl: './place-viewer.component.html',
  styleUrl: './place-viewer.component.css'
})
export class PlaceViewerComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  placeService: PlaceService = inject(PlaceService);
  place: Place | undefined;

  characterService: CharacterService = inject(CharacterService);
  characters: Character[] = [];

  constructor() {
    this.place = this.placeService.getPlaceById(parseInt(this.route.snapshot.params['id'], 10));

    // TODO firebase integration
    // if (this.place) {
    //   this.characters = this.characterService.getAllCharacters().filter((character) => this.place!.characterIds.includes(character.id));
    // }
  }
}
