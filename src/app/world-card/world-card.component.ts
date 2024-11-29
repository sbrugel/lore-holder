import { Component, Input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { World } from '../_interfaces/world';

@Component({
  selector: 'app-world-card',
  imports: [MatButtonModule, MatCardModule],
  templateUrl: './world-card.component.html',
  styleUrl: './world-card.component.css'
})
export class WorldCardComponent {
  @Input() world!: World;
}
