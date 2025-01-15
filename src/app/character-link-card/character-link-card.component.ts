import { Component, inject, Input } from '@angular/core';
import { Character } from '../_interfaces/character';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';
import { CharacterLink } from '../_interfaces/character-link';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmComponent } from '../_common/delete-confirm/delete-confirm.component';
import { CharacterLinkService } from '../_services/character-link.service';
import { MatButtonModule } from '@angular/material/button';
import { ToastrService } from 'ngx-toastr';
import { handleToastr } from '../_common/commonUtils';

@Component({
  selector: 'app-character-link-card',
  imports: [CommonModule, MatButtonModule, MatCardModule, RouterLink],
templateUrl: './character-link-card.component.html',
  styleUrl: './character-link-card.component.css'
})
export class CharacterLinkCardComponent {
  @Input() characterLink!: CharacterLink;
  @Input() cardSubtext!: string;

  @Input() editFunction!: any; // function to open edit dialog

  @Input() characterInput!: Observable<Character>;
  character!: Character;

  dialog = inject(MatDialog);
  
  characterLinkService: CharacterLinkService = inject(CharacterLinkService);

  toastr: ToastrService = inject(ToastrService);

  ngOnInit() {
    this.characterInput.subscribe(character => this.character = character);
  }

  /**
   * Show a dialog for delete confirmation, then delete if confirmed.
   */
  deleteCharacterLink() {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '70%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        handleToastr(this.toastr, result, () => this.characterLinkService.deleteLink(this.characterLink.id), "Character association deleted successfully!");
      }
    });
  }
}
