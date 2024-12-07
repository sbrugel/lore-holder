import { Component, Input } from '@angular/core';
import { Character } from '../_interfaces/character';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-character-link-card',
  imports: [CommonModule, MatCardModule, RouterLink],
  templateUrl: './character-link-card.component.html',
  styleUrl: './character-link-card.component.css'
})
export class CharacterLinkCardComponent {
  @Input() characterInput!: Observable<Character>;
  @Input() cardSubtext!: string;

  character!: Character;

  ngOnInit() {
    this.characterInput.subscribe(character => this.character = character);
  }
}
