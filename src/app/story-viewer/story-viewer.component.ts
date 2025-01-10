import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
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
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../_services/auth.service';
import { DeleteConfirmComponent } from '../_common/delete-confirm/delete-confirm.component';
import { CharacterAddDialog } from '../_dialogs/character-add-dialog.component';
import { ModuleEditorDialog } from '../_dialogs/module-editor-dialog.component';
import { OKDialogComponent } from '../_common/ok-dialog/ok-dialog.component';

@Component({
  selector: 'app-story-viewer',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    MatChipsModule,
    RouterModule,
  ],
  templateUrl: './story-viewer.component.html',
  styleUrl: './story-viewer.component.css',
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
  allCharacters: Character[] = [];

  authService: AuthService = inject(AuthService);
  user: any;

  readonly dialog = inject(MatDialog);

  readonly newModuleType = signal('text');
  readonly newModuleContents = signal('');
  readonly newModuleAppearance = signal('normal');
  readonly newModuleColor = signal('#ffffff');

  readonly newTagCharacterId = signal('');

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
      this.route.params.subscribe((params) => {
        this.storyService.getStoryById(params['id']).subscribe((story) => {
          this.story = story;
          if (this.story) {
            this.storyModuleService
              .getAllStoryModules()
              .subscribe((storyModules) => {
                this.storyModules = storyModules.filter((storyModule) =>
                  this.story!.moduleIds.includes(storyModule.id)
                );
                this.storyModules = this.storyModules.sort((a, b) =>
                  // sort by creation date from latest to oldest
                  a.creationDate > b.creationDate ? 1 : -1
                );
              });

            this.characterService.getAllCharacters().subscribe((characters) => {
              this.characters = characters.filter((character) =>
                this.story!.characterIds.includes(character.id)
              );
              this.allCharacters = characters.filter(
                (character) => character.ownerId === this.user.uid
              );
              this.allCharacters = this.allCharacters.sort((a, b) =>
                a.name.localeCompare(b.name)
              );
            });

            if (this.story.previousId) {
              this.storyService
                .getStoryById(this.story.previousId)
                .subscribe((previousStory) => {
                  this.previousStory = previousStory;
                });
            }

            if (this.story.nextId) {
              this.storyService
                .getStoryById(this.story.nextId)
                .subscribe((nextStory) => {
                  this.nextStory = nextStory;
                });
            }
          }
        });
      });
    });
  }

  openModuleDialog(storyModule?: StoryModule) {
    const dialogRef = this.dialog.open(ModuleEditorDialog, {
      width: '70%',
      data: storyModule
        ? { ...storyModule }
        : {
            id: '',
            type: this.newModuleType(),
            content: this.newModuleContents(),
            appearance: this.newModuleAppearance(),
            color: this.newModuleColor(),
          },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newModule: StoryModule = {
          id: storyModule?.id || '',
          ownerId: storyModule?.ownerId || this.user.uid,
          creationDate: storyModule?.creationDate || new Date(),
          type: result.moduleType(),
          content: result.moduleContents(),
          appearance: result.moduleAppearance(),
          color: result.moduleColor(),
        };

        if (storyModule) {
          this.storyModuleService.updateStoryModule(newModule);
        } else {
          this.storyModuleService.createNewStoryModule(
            newModule,
            this.story!.id
          );
        }
      }
    });
  }

  deleteModule(storyModule: StoryModule) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '70%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.storyModuleService.deleteStoryModule(storyModule.id);
      }
    });
  }

  openTagDialog() {
    // Open the dialog once
    const dialogRef = this.dialog.open(CharacterAddDialog, {
      width: '70%',
      data: {
        tagCharacterId: this.newTagCharacterId(),
        _allCharacters: [...this.allCharacters],
      },
    });

    // Handle after dialog is closed
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (!this.story!.characterIds.includes(result.characterId())) {
          const updatedStory = {
            ...this.story,
            characterIds: [...this.story!.characterIds, result.characterId()],
          } as Story;
          this.storyService.updateStory(updatedStory);
        } else {
          this.dialog.open(OKDialogComponent, {
            width: '70%',
            data: {
              title: 'Note',
              message: 'This tag is already being used for this story!',
            },
          });
        }
      }
    });
  }

  removeTag(characterId: string) {
    const updatedStory = {
      ...this.story,
      characterIds: this.story!.characterIds.filter((id) => id !== characterId),
    } as Story;
    this.storyService.updateStory(updatedStory);
  }
}
