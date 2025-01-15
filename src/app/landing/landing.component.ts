import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatExpansionModule } from '@angular/material/expansion';
import { AuthService } from '../_services/auth.service';
import { RouterLink } from '@angular/router';
import { CarouselComponent } from "../_common/carousel/carousel.component";

@Component({
  selector: 'app-landing',
  imports: [CommonModule, MatButtonModule, MatExpansionModule, RouterLink, CarouselComponent],
  templateUrl: './landing.component.html',
  styleUrls: ['./landing.component.css', '../app.component.css']
})
export class LandingComponent {
  title = 'landing';
  readonly panelOpenState = signal(false);

  carouselImages = [
    "https://i.imgur.com/7IsOzqB.png",
    "https://i.imgur.com/CFRpxIV.jpeg",
    "https://i.imgur.com/52yIUq2.jpeg",
    "https://i.imgur.com/HhYxuEv.png",
    "https://i.imgur.com/gSwUQ1v.png",
    "https://i.imgur.com/MTeEad4.png"
  ]

  authService: AuthService = inject(AuthService);
  user: any;

  ngOnInit() {
    this.authService.currentUser$.subscribe((user) => {
      this.user = user;
    });
  }
}
