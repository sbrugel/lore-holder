import { Component, inject, signal } from '@angular/core';
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
import { CharacterCardComponent } from '../character-card/character-card.component';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { AuthService } from '../_services/auth.service';
import { PlaceCardComponent } from '../place-card/place-card.component';
import { StoryCardComponent } from '../story-card/story-card.component';
import { CharacterEditorDialog } from '../_dialogs/character-editor-dialog.component';
import { PlaceEditorDialog } from '../_dialogs/place-editor-dialog.component';
import { StoryEditorDialog } from '../_dialogs/story-editor-dialog.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

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
    PlaceCardComponent,
    StoryCardComponent,
    ReactiveFormsModule,
  ],
  templateUrl: './world-viewer.component.html',
  styleUrls: [
    './world-viewer.component.css',
    '../_common/object-viewer.css',
    '../app.component.css',
  ],
})
export class WorldViewerComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  worldService: WorldService = inject(WorldService);
  world: World | undefined;

  characterService: CharacterService = inject(CharacterService);
  characters: Character[] = [];
  selectedCharacters: FormControl = new FormControl([]); // selected characters for story filtering

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

  readonly newPlaceName = signal('');
  readonly newPlaceDescription = signal('');
  readonly newPlaceAbout = signal('');
  readonly newPlacePopulation = signal('');

  readonly newStoryTitle = signal('');
  readonly newPreviousStory = signal('');
  readonly newNextStory = signal('');

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
      this.worldService
        .getWorldById(this.route.snapshot.params['id'])
        .subscribe((world: World) => {
          this.world = world;
        });

      this.characterService
        .getAllCharacters()
        .subscribe((characters: Character[]) => {
          this.characters = characters.filter((character) =>
            this.world!.characterIds.includes(character.id)
          );
          this.characters = this.characters.sort((a, b) =>
            a.name.localeCompare(b.name)
          );
        });

      this.placeService.getAllPlaces().subscribe((places: Place[]) => {
        this.places = places.filter((place) =>
          this.world!.placeIds.includes(place.id)
        );
        this.places = this.places.sort((a, b) => a.name.localeCompare(b.name));
      });

      this.updateStories();
    });
  }

  updateStories() {
    this.storyService.getAllStories().subscribe((stories: Story[]) => {
      this.stories = stories.filter(
        (story) =>
          this.world!.storyIds.includes(story.id) &&
          this.hasSelectedCharacterTag(story)
      );
      this.stories = this.stories.sort((a, b) =>
        // sort by creation date from latest to oldest
        a.creationDate > b.creationDate ? 1 : -1
      );
    });
  }

  /**
   * If no character tags are selected, include this story in filtering (return true).
   * If at least one tag is selected, then return the story if it includes at least one of the selected tags.
   */
  hasSelectedCharacterTag(story: Story) {
    if (!this.selectedCharacters) return true;
    if (this.selectedCharacters.value.length === 0) {
      return true;
    } else
      return story.characterIds.some((characterId) =>
        this.selectedCharacters.value.includes(characterId)
      );
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
      data: character
        ? { ...character }
        : {
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
            galleryLinks: this.newCharacterGalleryLinks(),
          },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newCharacter: Character = {
          id: character?.id || '',
          ownerId: character?.ownerId || this.user.uid,
          creationDate: character?.creationDate || new Date(),
          name: result.characterName(),
          description: result.characterDescription(),
          about: result.characterBio(),
          imageUrl:
            result.characterImageUrl() !== ''
              ? result.characterImageUrl()
              : 'https://static.vecteezy.com/system/resources/thumbnails/009/292/244/small/default-avatar-icon-of-social-media-user-vector.jpg',
          age: result.characterAge(),
          gender: result.characterGender(),
          race: result.characterRace(),
          pronouns: result.characterPronouns(),
          colors: result.characterColors().split('\n'),
          galleryLinks: result.characterGalleryLinks().split('\n'),
          detailIds: character?.detailIds || [],
        };

        if (character) {
          // update character
          this.characterService.updateCharacter(newCharacter);
        } else {
          // create new character
          this.characterService.createNewCharacter(
            newCharacter,
            this.world!.id
          );
        }
      }
    });
  }

  triggerPlaceDialog(place?: Place) {
    return () => this.openPlaceDialog(place);
  }

  openPlaceDialog(place?: Place) {
    const dialogRef = this.dialog.open(PlaceEditorDialog, {
      width: '70%',
      data: place
        ? { ...place }
        : {
            id: '',
            name: this.newPlaceName(),
            description: this.newPlaceDescription(),
            about: this.newPlaceAbout(),
            population: this.newPlacePopulation(),
          },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newPlace: Place = {
          id: place?.id || '',
          ownerId: place?.ownerId || this.user.uid,
          creationDate: place?.creationDate || new Date(),
          name: result.placeName(),
          description: result.placeDescription(),
          about: result.placeAbout(),
          population: result.placePopulation(),
          characterIds: place?.characterIds || [],
          detailIds: place?.detailIds || [],
        };

        if (place) {
          // update character
          this.placeService.updatePlace(newPlace);
        } else {
          // create new character
          this.placeService.createNewPlace(newPlace, this.world!.id);
        }
      }
    });
  }

  triggerStoryDialog(story?: Story) {
    return () => this.openStoryDialog(story);
  }

  openStoryDialog(story?: Story) {
    // Open the dialog once
    const dialogRef = this.dialog.open(StoryEditorDialog, {
      width: '70%',
      data: {
        ...(story
          ? { ...story }
          : {
              id: '',
              title: this.newStoryTitle(),
              previousId: this.newPreviousStory(),
              nextId: this.newNextStory(),
            }),
        _allStories: [...this.stories],
      },
    });

    // Handle after dialog is closed
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        const newStory: Story = {
          id: story?.id || '',
          ownerId: story?.ownerId || this.user.uid,
          creationDate: story?.creationDate || new Date(),
          title: result.storyTitle(),
          characterIds: story?.characterIds || [],
          moduleIds: story?.moduleIds || [],
          previousId: result.previousStoryId(),
          nextId: result.nextStoryId(),
        };

        if (story) {
          // update existing story
          this.storyService.updateStory(newStory);
        } else {
          // create new story
          this.storyService.createNewStory(newStory, this.world!.id);
        }
      }
    });
  }
}
