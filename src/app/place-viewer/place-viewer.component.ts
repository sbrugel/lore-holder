import { Component, inject, signal } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { Character } from '../_interfaces/character';
import { CharacterService } from '../_services/character.service';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { PlaceService } from '../_services/place.service';
import { Place } from '../_interfaces/place';
import { CharacterCardComponent } from "../character-card/character-card.component";
import { AuthService } from '../_services/auth.service';
import { DeleteConfirmComponent } from '../_common/delete-confirm/delete-confirm.component';
import { DetailEditorDialog } from '../_dialogs/detail-editor-dialog.component';
import { CustomDetail } from '../_interfaces/custom-detail';
import { MatDialog } from '@angular/material/dialog';
import { CustomDetailService } from '../_services/custom-detail.service';

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

  detailsService: CustomDetailService = inject(CustomDetailService);
  details: CustomDetail[] = [];

  authService: AuthService = inject(AuthService);
  user: any;

  readonly dialog = inject(MatDialog);
  
  readonly newDetailName = signal('');
  readonly newDetailInputType = signal('text');
  readonly newDetailContents = signal('');
  readonly newDetailListContents = signal([]);

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
      this.route.params.subscribe((params) => {
        this.placeService.getPlaceById(params['id']).subscribe((place) => {
          this.place = place;
          if (this.place) {
            this.characterService.getAllCharacters().subscribe((characters: Character[]) => {
              this.characters = characters.filter((character) => this.place!.characterIds.includes(character.id));
            });
            this.detailsService
              .getAllCustomDetails()
              .subscribe((details: CustomDetail[]) => {
                this.details = details.filter((detail) =>
                  this.place!.detailIds.includes(detail.id)
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
}
