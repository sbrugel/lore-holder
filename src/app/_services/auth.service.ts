// src/app/auth/auth.service.ts
import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { GoogleAuthProvider } from '@angular/fire/auth';
import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
    private currentUserSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
    public currentUser$ = this.currentUserSubject.asObservable();
  
    constructor(private afAuth: AngularFireAuth) {
      // Initialize auth state listener
      this.afAuth.onAuthStateChanged((user) => {
        if (user) {
          console.log('User is signed in:', user); // Logging user data
          this.currentUserSubject.next(user);  // Emit the signed-in user
        } else {
          console.log('No user signed in');
          this.currentUserSubject.next(null);  // Emit null when signed out
        }
      });
    }

    async signInWithGoogle() {
        const provider = new GoogleAuthProvider();
        try {
            await this.afAuth.setPersistence('local');
            const result = await this.afAuth.signInWithPopup(provider);
            return result.user;
        } catch (error: any) {
            console.error('Google Sign-In error:', error.code); // Log error code
            console.error('Error details:', error.message); // Log the error message
            throw error;
        }
    }

    async signOut() {
        await this.afAuth.signOut();
    }
}
