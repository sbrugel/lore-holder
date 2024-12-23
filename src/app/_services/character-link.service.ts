import { Injectable } from '@angular/core';
import { CharacterLink } from '../_interfaces/character-link';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class CharacterLinkService {
  private collectionName = 'characterLinks'; // collection name in Firebase

  constructor(private firestore: AngularFirestore) {}

  /**
   *
   * @returns All character links
   */
  getCharacterLinks(): Observable<CharacterLink[]> {
    return this.firestore
      .collection(this.collectionName)
      .valueChanges({ idField: 'id' })
      .pipe(
        map((data: any[]) => {
          return data.map((data: any) => {
            const characterLink: CharacterLink = {
              id: data.id,
              ownerId: data.ownerId,
              fromId: data.fromId,
              toId: data.toId,
              details: data.details,
              relationType: data.relationType,
            };
            return characterLink;
          });
        })
      );
  }

  /**
   *
   * @param characterId The ID of the link
   * @returns The character link with the given ID or undefined if not found
   */
  getCharacterLinkById(id: string): Observable<CharacterLink> {
    return this.firestore
      .collection(this.collectionName)
      .doc(id)
      .valueChanges()
      .pipe(
        map((data: any) => {
          const characterLink: CharacterLink = {
            id: data.id,
            ownerId: data.ownerId,
            fromId: data.fromId,
            toId: data.toId,
            details: data.details,
            relationType: data.relationType,
          };
          return characterLink;
        })
      );
  }
}
