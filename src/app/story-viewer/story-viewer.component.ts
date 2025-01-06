import { Component, inject, model, OnInit, signal } from '@angular/core';
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
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../_services/auth.service';

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

  authService: AuthService = inject(AuthService);
  user: any;

  readonly dialog = inject(MatDialog);

  readonly newModuleType = signal('text');
  readonly newModuleContents = signal('');
  readonly newModuleAppearance = signal('normal');
  readonly newModuleColor = signal('#000000');

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
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
    });
  }

  openModuleDialog(storyModule?: StoryModule) {
    const dialogRef = this.dialog.open(ModuleEditorDialog, {
      width: '70%',
      data: storyModule
        ? { ...storyModule }
        : {
            id: '',
            moduleType: this.newModuleType(),
            moduleContents: this.newModuleContents(),
            moduleAppearance: this.newModuleAppearance(),
            moduleColor: this.newModuleColor(),
          },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newModule: StoryModule = {
          id: storyModule?.id || '',
          ownerId: storyModule?.ownerId || this.user.uid,
          type: result.moduleType(),
          content: result.moduleContents(),
          appearance: result.moduleAppearance(),
          color: result.moduleColor(),
        };

        if (storyModule) {
          // update detail
          this.storyModuleService.updateStoryModule(newModule);
        } else {
          // create new detail
          this.storyModuleService.createNewStoryModule(
            newModule,
            this.story!.id
          );
        }
      }
    });
  }
}

@Component({
  selector: 'module-editor-dialog',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
  ],
  templateUrl: '../_dialogs/module-editor-dialog.html',
  styleUrls: ['../_common/editor-dialog.css'],
})
export class ModuleEditorDialog {
  readonly dialogRef = inject(MatDialogRef<ModuleEditorDialog>);
  data = inject(MAT_DIALOG_DATA);

  readonly moduleType = model(this.data.moduleType);
  readonly moduleContents = model(this.data.moduleContents);
  readonly moduleAppearance = model(this.data.moduleAppearance);
  readonly moduleColor = model(this.data.moduleColor);

  onNoClick(): void {
    this.dialogRef.close();
  }
}
