import { Component, inject } from '@angular/core';
import { ActivatedRoute, RouterModule } from '@angular/router';
import { WorldService } from '../_services/world.service';
import { World } from '../_interfaces/world';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-world-viewer',
  imports: [CommonModule, MatButtonModule, RouterModule],
  templateUrl: './world-viewer.component.html',
  styleUrl: './world-viewer.component.css'
})
export class WorldViewerComponent {
  route: ActivatedRoute = inject(ActivatedRoute);
  worldService: WorldService = inject(WorldService);
  world: World | undefined;

  constructor() {
    this.world = this.worldService.getWorldById(parseInt(this.route.snapshot.params['id'], 10));
  }
}
