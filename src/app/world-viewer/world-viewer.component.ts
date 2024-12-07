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
import { PlaceService } from './../_services/place.service';
import { Place } from '../_interfaces/place';
import { StoryService } from '../_services/story.service';
import { Story } from '../_interfaces/story';
import { MatListModule } from '@angular/material/list';
import { MatChipsModule } from '@angular/material/chips';
import { CharacterCardComponent } from "../character-card/character-card.component";

@Component({
  selector: 'app-world-viewer',
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatCardModule, 
    MatChipsModule, 
    MatListModule, 
    MatTabsModule, 
    RouterModule, 
    CharacterCardComponent
  ],
templateUrl: './world-viewer.component.html',
  styleUrl: './world-viewer.component.css'
})
export class WorldViewerComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  worldService: WorldService = inject(WorldService);
  world: World | undefined;

  characterService: CharacterService = inject(CharacterService);
  characters: Character[] = [];

  placeService: PlaceService = inject(PlaceService);
  places: Place[] = [];

  storyService: StoryService = inject(StoryService);
  stories: Story[] = [];

  ngOnInit() {
    // this.world = this.worldService.getWorldById(this.route.snapshot.params['id']);
    
    this.worldService.getWorldById(this.route.snapshot.params['id']).subscribe((world: World) => {
      this.world = world;
      // TODO: convert below to use firebase when the time comes
      // if (this.world) {
      //   this.characters = this.characterService.getAllCharacters();
      //   // filter characters by if their ID is in world's characterIds
      //   this.characters = this.characters.filter((character) => this.world!.characterIds.includes(character.id));

      //   this.places = this.placeService.getAllPlaces();
      //   // filter places by if their ID is in world's placeIds
      //   this.places = this.places.filter((place) => this.world!.placeIds.includes(place.id));

      //   this.stories = this.storyService.getAllStories();
      //   // filter stories by if their ID is in world's storyIds
      //   this.stories = this.stories.filter((story) => this.world!.storyIds.includes(story.id));
      // }
    });
  }
}
