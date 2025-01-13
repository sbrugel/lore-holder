import { Component, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';

@Component({
  selector: 'app-landing',
  imports: [CommonModule, MatButtonModule, MatExpansionModule],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css', '../app.component.css']
})
export class LandingComponent {
  title = 'landing';
  readonly panelOpenState = signal(false);
}
