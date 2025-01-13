import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Character } from '../_interfaces/character';
import { CharacterService } from '../_services/character.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PlaceService } from '../_services/place.service';
import { Place } from '../_interfaces/place';
import { AuthService } from '../_services/auth.service';
import { DeleteConfirmComponent } from '../_common/delete-confirm/delete-confirm.component';
import { DetailEditorDialog } from '../_dialogs/detail-editor-dialog.component';
import { CustomDetail } from '../_interfaces/custom-detail';
import { MatDialog } from '@angular/material/dialog';
import { CustomDetailService } from '../_services/custom-detail.service';
import { CharacterAddDialog } from '../_dialogs/character-add-dialog.component';
import { OKDialogComponent } from '../_common/ok-dialog/ok-dialog.component';

@Component({
  selector: 'app-place-viewer',
  imports: [CommonModule, MatButtonModule, MatCardModule, RouterModule],
  templateUrl: './place-viewer.component.html',
  styleUrls: [
    './place-viewer.component.css',
    '../_common/object-viewer.css',
    '../app.component.css',
  ],
})
export class PlaceViewerComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  placeService: PlaceService = inject(PlaceService);
  place: Place | undefined;

  characterService: CharacterService = inject(CharacterService);
  characters: Character[] = [];
  allCharacters: Character[] = [];

  detailsService: CustomDetailService = inject(CustomDetailService);
  details: CustomDetail[] = [];

  authService: AuthService = inject(AuthService);
  user: any;

  readonly dialog = inject(MatDialog);

  readonly newDetailName = signal('');
  readonly newDetailInputType = signal('paragraph');
  readonly newDetailContents = signal('');
  readonly newDetailListContents = signal([]);

  readonly newResidentId = signal(''); // a Character to add as a resident

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
      this.route.params.subscribe((params) => {
        this.placeService.getPlaceById(params['id']).subscribe((place) => {
          this.place = place;
          if (this.place) {
            this.characterService
              .getAllCharacters()
              .subscribe((characters: Character[]) => {
                this.characters = characters.filter((character) =>
                  this.place!.characterIds.includes(character.id)
                );
                this.allCharacters = characters.filter(
                  (character) => character.ownerId === this.user.uid
                );
                this.allCharacters = this.allCharacters.sort((a, b) =>
                  a.name.localeCompare(b.name)
                );
              });

            this.detailsService
              .getAllCustomDetails()
              .subscribe((details: CustomDetail[]) => {
                this.details = details.filter((detail) =>
                  this.place!.detailIds.includes(detail.id)
                );
                this.details = this.details.sort((a, b) =>
                  // sort by creation date from latest to oldest
                  a.creationDate > b.creationDate ? 1 : -1
                );
              });
          }
        });
      });
    });
  }

  openDetailDialog(customDetail?: CustomDetail) {
    const dialogRef = this.dialog.open(DetailEditorDialog, {
      width: '70%',
      data: customDetail
        ? { ...customDetail }
        : {
            id: '',
            name: this.newDetailName(),
            inputType: this.newDetailInputType(),
            contents: this.newDetailContents(),
            listContents: this.newDetailListContents(),
          },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newDetail: CustomDetail = {
          id: customDetail?.id || '',
          ownerId: customDetail?.ownerId || this.user.uid,
          creationDate: customDetail?.creationDate || new Date(),
          name: result.detailName(),
          inputType: result.detailInputType(),
          contents: result.detailContents(),
          listContents: result
            .detailContents()
            .split('\n')
            .map((line: any) => line.trim()),
          expansionPanel: customDetail?.expansionPanel || false,
        };

        if (customDetail) {
          // update detail
          this.detailsService.updateCustomDetail(newDetail);
        } else {
          // create new detail
          this.detailsService.createNewCustomDetail(
            newDetail,
            this.place!.id,
            'places'
          );
        }
      }
    });
  }

  deleteDetail(customDetail: CustomDetail) {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '70%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.detailsService.deleteCustomDetail(customDetail.id);
      }
    });
  }

  openResidentDialog() {
    // Open the dialog once
    const dialogRef = this.dialog.open(CharacterAddDialog, {
      width: '70%',
      data: {
        residentId: this.newResidentId(),
        _allCharacters: [...this.allCharacters],
      },
    });

    // Handle after dialog is closed
    dialogRef.afterClosed().subscribe((result: any) => {
      if (result) {
        if (!this.place!.characterIds.includes(result.characterId())) {
          const updatedPlace = {
            ...this.place,
            characterIds: [...this.place!.characterIds, result.characterId()],
          } as Place;
          this.placeService.updatePlace(updatedPlace);
        } else {
          this.dialog.open(OKDialogComponent, {
            width: '70%',
            data: {
              title: 'Cannot add character',
              message: 'This character already lives here!',
            },
          });
        }
      }
    });
  }

  removeResident(characterId: string) {
    const updatedPlace = {
      ...this.place,
      characterIds: this.place!.characterIds.filter((id) => id !== characterId),
    } as Place;
    this.placeService.updatePlace(updatedPlace);
  }
}
