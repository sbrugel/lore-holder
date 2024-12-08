import { Component, inject, OnInit } from '@angular/core';
import { ActivatedRoute, RouterLink, RouterModule } from '@angular/router';
import { StoryService } from '../_services/story.service';
import { Story } from '../_interfaces/story';
import { StoryModuleService } from './../_services/story-module.service';
import { StoryModule } from '../_interfaces/story-module';
import { CommonModule } from '@angular/common';
import { CharacterService } from '../_services/character.service';
import { Character } from '../_interfaces/character';
import { MatChipsModule } from '@angular/material/chips';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-story-viewer',
  imports: [CommonModule, MatButtonModule, MatCardModule, MatChipsModule, RouterLink, RouterModule],
  templateUrl: './story-viewer.component.html',
  styleUrl: './story-viewer.component.css'
})
export class StoryViewerComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  storyService: StoryService = inject(StoryService);
  story: Story | undefined;
  previousStory: Story | undefined;
  nextStory: Story | undefined;

  storyModuleService: StoryModuleService = inject(StoryModuleService);
  storyModules: StoryModule[] = [];

  characterService: CharacterService = inject(CharacterService);
  characters: Character[] = [];

  ngOnInit() {
    this.route.params.subscribe((params) => {
      this.storyService.getStoryById(params['id']).subscribe((story) => {
        this.story = story;
        if (this.story) {
          this.storyModuleService.getAllStoryModules().subscribe((storyModules) => {
            this.storyModules = storyModules.filter((storyModule) => this.story!.moduleIds.includes(storyModule.id));
          });

          this.characterService.getAllCharacters().subscribe((characters) => {
            this.characters = characters.filter((character) => this.story!.characterIds.includes(character.id));
          });

          if (this.story.previousId) {
            this.storyService.getStoryById(this.story.previousId).subscribe((previousStory) => {
              this.previousStory = previousStory;
            });
          }

          if (this.story.nextId) {
            this.storyService.getStoryById(this.story.nextId).subscribe((nextStory) => {
              this.nextStory = nextStory;
            });
          }
        }
      });
    });
  }
}
