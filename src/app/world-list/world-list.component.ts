import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatInputModule } from '@angular/material/input'; 
import { WorldService } from '../world.service';
import { World } from '../_interfaces/world';
import { WorldCardComponent } from "../world-card/world-card.component";

@Component({
  selector: 'app-world-list',
  imports: [CommonModule, FormsModule, MatButtonModule, MatInputModule, WorldCardComponent],
  templateUrl: './world-list.component.html',
  styleUrl: './world-list.component.css'
})
export class WorldListComponent {
  worldList: World[] = [];
  filteredWorldList: World[] = [];

  worldService: WorldService = inject(WorldService);

  filterResults(text: string) {
    console.log(text);
  }

  constructor() {
    this.worldList = this.worldService.getAllWorlds();
    this.filteredWorldList = this.worldList;
  }
}
