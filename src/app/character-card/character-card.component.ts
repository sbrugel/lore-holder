import { Component, Input } from '@angular/core';
import { Character } from '../_interfaces/character';
import { CommonModule } from '@angular/common';
import { MatCardModule } from '@angular/material/card';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-character-card',
  imports: [CommonModule, MatCardModule, RouterLink],
  templateUrl: './character-card.component.html',
  styleUrl: './character-card.component.css'
})
export class CharacterCardComponent {
  @Input() character!: Character;
}
