import { Component, inject, model, OnInit, signal } from '@angular/core';
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
import { CharacterLinkCardComponent } from "../character-link-card/character-link-card.component";
import { FormsModule } from '@angular/forms';
import { MatDialogModule, MatDialogRef, MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { AuthService } from '../_services/auth.service';
import { DeleteConfirmComponent } from '../_common/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-character-viewer',
  imports: [CommonModule, MatButtonModule, MatCardModule, RouterModule, CharacterLinkCardComponent],
  templateUrl: './character-viewer.component.html',
  styleUrl: './character-viewer.component.css'
})
export class CharacterViewerComponent {
  route: ActivatedRoute = inject(ActivatedRoute);

  characterService: CharacterService = inject(CharacterService);
  character: Character | undefined;

  detailsService: CustomDetailService = inject(CustomDetailService);
  details: CustomDetail[] = [];

  characterLinkService: CharacterLinkService = inject(CharacterLinkService);
  characterLinks: CharacterLink[] = [];

  authService: AuthService = inject(AuthService);
  user: any;

  subtitleText: string[] = [];

  readonly dialog = inject(MatDialog);

  readonly newDetailName = signal('');
  readonly newDetailInputType = signal('text');
  readonly newDetailContents = signal('');
  readonly newDetailListContents = signal([]);

  handleRender(character: Character) {
    this.character = character;
    this.subtitleText = [];
    if (this.character) {
      if (this.character.race) this.subtitleText.push(this.character.race);

      if (this.character.age) this.subtitleText.push(this.character.age.toString());

      if (this.character.pronouns) this.subtitleText.push(this.character.pronouns.toString());

      this.detailsService.getAllCustomDetails().subscribe((details: CustomDetail[]) => {
        this.details = details.filter((detail) => this.character!.detailIds.includes(detail.id));
      });

      this.characterLinkService.getCharacterLinks().subscribe((links: CharacterLink[]) => {
        this.characterLinks = links.filter((link) => link.fromId === this.character!.id);
        console.log(this.characterLinks);
      });
    }
  }

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
      this.route.params.subscribe((params) => {
        this.characterService.getCharacterById(params['id']).subscribe((character) => {
          this.handleRender(character);
        });
      });
    })
  }

  openDetailDialog(customDetail?: CustomDetail) {
    const dialogRef = this.dialog.open(DetailEditorDialog, {
      width: '70%',
      data: customDetail ? {...customDetail} : {
        id: '',
        name: this.newDetailName(),
        inputType: this.newDetailInputType(),
        contents: this.newDetailContents(),
        listContents: this.newDetailListContents()
      }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        const newDetail: CustomDetail = {
          id: customDetail?.id || '',
          ownerId: customDetail?.ownerId || this.user.uid,
          name: result.detailName(),
          inputType: result.detailInputType(),
          contents: result.detailContents(),
          listContents: result.detailContents().split("\n").map((line: any) => line.trim()),
          expansionPanel: customDetail?.expansionPanel || false,
        }

        if (customDetail) {
          // update detail
          this.detailsService.updateCustomDetail(newDetail);
        } else {
          // create new detail
          this.detailsService.createNewCustomDetail(newDetail, this.character!.id);
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

@Component({
  selector: 'detail-editor-dialog',
  imports: [
CommonModule,
    MatButtonModule,
    MatDialogModule,
    MatInputModule,
    MatSelectModule,
    FormsModule,
    MatFormFieldModule,
  ],
  templateUrl: './detail-editor-dialog.html',
  styleUrls: ['../_common/editor-dialog.css']
})
export class DetailEditorDialog {
  readonly dialogRef = inject(MatDialogRef<DetailEditorDialog>);
  data = inject(MAT_DIALOG_DATA);

  readonly detailName = signal(this.data.name);
  readonly detailInputType = signal(this.data.inputType);
  readonly detailContents = signal(this.data.contents);
  readonly detailListContents = signal(this.data.listContents);

  onNoClick(): void {
    this.dialogRef.close();
  }
}