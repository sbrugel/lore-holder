import { Component, inject, Input } from '@angular/core';
import { Character } from '../_interfaces/character';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { CharacterService } from '../_services/character.service';
import { MatDialog } from '@angular/material/dialog';
import { DeleteConfirmComponent } from '../_common/delete-confirm/delete-confirm.component';

@Component({
  selector: 'app-character-card',
  imports: [CommonModule, MatButtonModule, MatCardModule, RouterLink],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.css'
})
export class CharacterCardComponent {
  @Input() character!: Character;
  @Input() editFunction!: any; // function to open edit dialog

  dialog = inject(MatDialog);
  characterService: CharacterService = inject(CharacterService);

  /**
   * Show a dialog for delete confirmation, then delete if confirmed.
   */
  deleteCharacter() {
    const dialogRef = this.dialog.open(DeleteConfirmComponent, {
      width: '70%',
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.characterService.deleteCharacter(this.character.id);
      }
    });
  }
}
