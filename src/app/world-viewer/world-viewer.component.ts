import { Component, inject, model, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WorldService } from '../_services/world.service';
import { World } from '../_interfaces/world';
import { CommonModule, NgIf } from '@angular/common';
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
import { MAT_DIALOG_DATA, MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FormsModule } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { AuthService } from '../_services/auth.service';

@Component({
  selector: 'app-world-viewer',
  imports: [
    CommonModule, 
    MatButtonModule, 
    MatCardModule, 
    MatChipsModule, 
    MatDialogModule,
    MatListModule, 
    MatTabsModule, 
    RouterModule, 
    CharacterCardComponent,
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

  authService: AuthService = inject(AuthService);
  user: any;
  
  // dialog for new world
  readonly dialog = inject(MatDialog);
  
  readonly newCharacterName = signal('');
  readonly newCharacterDescription = signal('');
  readonly newCharacterBio = signal('');
  readonly newCharacterImageUrl = signal('');
  readonly newCharacterAge = signal('');
  readonly newCharacterGender = signal('');
  readonly newCharacterRace = signal('');
  readonly newCharacterPronouns = signal('');
  readonly newCharacterColors = signal('');
  readonly newCharacterGalleryLinks = signal('');

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
      this.worldService.getWorldById(this.route.snapshot.params['id']).subscribe((world: World) => {
        this.world = world;
      });
  
      this.characterService.getAllCharacters().subscribe((characters: Character[]) => {
        this.characters = characters.filter((character) => this.world!.characterIds.includes(character.id));
      });
  
      this.placeService.getAllPlaces().subscribe((places: Place[]) => {
        this.places = places.filter((place) => this.world!.placeIds.includes(place.id));
      });
  
      this.storyService.getAllStories().subscribe((stories: Story[]) => {
        this.stories = stories.filter((story) => this.world!.storyIds.includes(story.id));
      });
    });
  }

  /**
   * Function passed into character-card component to open edit dialog
   * @param character 
   * @returns 
   */
  triggerCharacterDialog(character?: Character) {
    return () => this.openCharacterDialog(character);
  }

  openCharacterDialog(character?: Character) {
    const dialogRef = this.dialog.open(CharacterEditorDialog, {
      width: '70%',
      data: character ? {...character} : {
        id: '',
        name: this.newCharacterName(),
        description: this.newCharacterDescription(),
        about: this.newCharacterBio(),
        imageUrl: this.newCharacterImageUrl(),
        age: this.newCharacterAge(),
        gender: this.newCharacterGender(),
        race: this.newCharacterRace(),
        pronouns: this.newCharacterPronouns(),
        colors: this.newCharacterColors(),
        galleryLinks: this.newCharacterGalleryLinks()
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newCharacter: Character = {
          id: character?.id || '',
          ownerId: character?.ownerId || this.user.uid,
          name: result.characterName(),
          description: result.characterDescription(),
          about: result.characterBio(),
          imageUrl: result.characterImageUrl(),
          age: result.characterAge(),
          gender: result.characterGender(),
          race: result.characterRace(),
          pronouns: result.characterPronouns(),
          colors: result.characterColors().split("\n"),
          galleryLinks: result.characterGalleryLinks().split("\n"),
          detailIds: character?.detailIds || []
        }

        console.log(result.characterColors().split("\n"));

        if (character) {
          // update character
          this.characterService.updateCharacter(newCharacter);
        } else {
          // create new character
          this.characterService.createNewCharacter(newCharacter, this.world!.id);
        }
      }
    });
  }
}

@Component({
  selector: 'character-editor-dialog',
  imports: [
    CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    FormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './character-editor-dialog.html',
  styleUrls: ['../_common/editor-dialog.css']
})
export class CharacterEditorDialog {
  readonly dialogRef = inject(MatDialogRef<CharacterEditorDialog>);
  data = inject<Character>(MAT_DIALOG_DATA);

  readonly characterName = model(this.data.name);
  readonly characterDescription = model(this.data.description);
  readonly characterBio = model(this.data.about);
  readonly characterImageUrl = model(this.data.imageUrl);
  readonly characterAge = model(this.data.age);
  readonly characterGender = model(this.data.gender);
  readonly characterRace = model(this.data.race);
  readonly characterPronouns = model(this.data.pronouns);
  readonly characterColors = model(this.data.colors ? this.data.colors.join('\n') : '');
  readonly characterGalleryLinks = model(this.data.galleryLinks ? this.data.galleryLinks.join('\n') : '');

  allowOnlyNumbers(event: KeyboardEvent): void {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode < 48 || charCode > 57) {
      event.preventDefault();
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}