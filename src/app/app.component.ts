import { Component } from '@angular/core';
import { RouterLink, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatIconModule } from '@angular/material/icon';
import 'firebase/compat/auth';
import { AuthService } from './_services/auth.service';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-root',
  imports: [MatButtonModule, MatToolbarModule, MatIconModule, RouterLink, RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'lore-holder';
  user: any = null; // Store the logged-in user
  isLoading: boolean = true; // Track loading state (to handle initial loading)

  constructor(private authService: AuthService) {}

  ngOnInit() {
    // Subscribe to currentUser$ observable
    this.authService.currentUser$.subscribe((user) => {
      if (user) {
        this.user = user;  // Set the user when signed in
        console.log('User updated:', user);  // Log user details to verify
      } else {
        this.user = null;  // Reset the user when signed out
      }
      this.isLoading = false;  // Stop loading once user state is determined
    });
  }

  // Sign in with Google
  signIn() {
    this.authService.signInWithGoogle().then((user) => {
      console.log('User signed in:', user!.displayName);
    }).catch((error) => {
      console.error('Sign-In error:', error);
    });
  }

  signOut() {
    this.authService.signOut();
    window.location.reload();
  }
}
