import { Component, inject, signal } from '@angular/core';
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
import { CharacterLinkCardComponent } from '../character-link-card/character-link-card.component';
import { MatDialog } from '@angular/material/dialog';
import { AuthService } from '../_services/auth.service';
import { DeleteConfirmComponent } from '../_common/delete-confirm/delete-confirm.component';
import { DetailEditorDialog } from '../_dialogs/detail-editor-dialog.component';
import { CharacterLinkEditorDialog } from '../_dialogs/link-editor-dialog.component';

@Component({
  selector: 'app-character-viewer',
  imports: [
    CommonModule,
    MatButtonModule,
    MatCardModule,
    RouterModule,
    CharacterLinkCardComponent,
  ],
  templateUrl: './character-viewer.component.html',
  styleUrl: './character-viewer.component.css',
})
export class CharacterViewerComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  characterService: CharacterService = inject(CharacterService);
  character: Character | undefined;
  allCharacters: Character[] = [];

  detailsService: CustomDetailService = inject(CustomDetailService);
  details: CustomDetail[] = [];

  characterLinkService: CharacterLinkService = inject(CharacterLinkService);
  characterLinks: CharacterLink[] = [];

  authService: AuthService = inject(AuthService);
  user: any;

  subtitleText: string[] = [];

  readonly dialog = inject(MatDialog);

  readonly newDetailName = signal('');
  readonly newDetailInputType = signal('paragraph');
  readonly newDetailContents = signal('');
  readonly newDetailListContents = signal([]);

  readonly newLinkTo = signal('');
  readonly newLinkDetails = signal('');
  readonly newLinkType = signal('friend');

  handleRender(character: Character) {
    this.character = character;
    this.subtitleText = [];
    if (this.character) {
      if (this.character.race) this.subtitleText.push(this.character.race);

      if (this.character.age)
        this.subtitleText.push(this.character.age.toString());

      if (this.character.pronouns)
        this.subtitleText.push(this.character.pronouns.toString());

      this.detailsService
        .getAllCustomDetails()
        .subscribe((details: CustomDetail[]) => {
          this.details = details.filter((detail) =>
            this.character!.detailIds.includes(detail.id)
          );
          this.details = this.details.sort((a, b) =>
            // sort by creation date from latest to oldest
            a.creationDate > b.creationDate ? 1 : -1
          );
        });

      this.characterLinkService
        .getCharacterLinks()
        .subscribe((links: CharacterLink[]) => {
          this.characterLinks = links.filter(
            (link) => link.fromId === this.character!.id
          );
          this.characterLinks = this.characterLinks.sort((a, b) =>
            // sort by creation date from latest to oldest
            a.creationDate > b.creationDate ? 1 : -1
          );
        });
    }
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
      this.route.params.subscribe((params) => {
        this.characterService
          .getCharacterById(params['id'])
          .subscribe((character) => {
            this.handleRender(character);
          });
      });
      this.characterService.getAllCharacters().subscribe((characters) => {
        this.allCharacters = characters.filter(
          (character) => character.ownerId === this.user.uid
        );
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
          this.detailsService.updateCustomDetail(newDetail);
        } else {
          this.detailsService.createNewCustomDetail(
            newDetail,
            this.character!.id
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

  openLinkDialog(characterLink?: CharacterLink) {
    const dialogRef = this.dialog.open(CharacterLinkEditorDialog, {
      width: '70%',
      data: {
        ...(characterLink
          ? { ...characterLink }
          : {
              id: '',
              name: this.newDetailName(),
              inputType: this.newDetailInputType(),
              contents: this.newDetailContents(),
              listContents: this.newDetailListContents(),
            }),
        _allCharacters: [...this.allCharacters],
      },
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newLink: CharacterLink = {
          id: characterLink?.id || '',
          ownerId: characterLink?.ownerId || this.user.uid,
          creationDate: characterLink?.creationDate || new Date(),
          fromId: this.character!.id,
          toId: result.linkTo(),
          details: result.linkDetails(),
          relationType: result.linkType(),
        };

        if (characterLink) {
          this.characterLinkService.updateLink(newLink);
        } else {
          this.characterLinkService.createNewLink(newLink);
        }
      }
    });
  }

  triggerLinkDialog(characterLink?: CharacterLink) {
    return () => this.openLinkDialog(characterLink);
  }
}
