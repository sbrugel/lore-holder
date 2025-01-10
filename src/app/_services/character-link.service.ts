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
              creationDate: data.creationDate,
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
            creationDate: data.creationDate,
            fromId: data.fromId,
            toId: data.toId,
            details: data.details,
            relationType: data.relationType,
          };
          return characterLink;
        })
      );
  }

  /**
   * 
   * @param newLink The new link to create
   */
  createNewLink(newLink: CharacterLink) {
    const newDoc = this.firestore
      .collection(this.collectionName)
      .add(newLink);

    newDoc.then((docRef) => {
      docRef.update({ id: docRef.id });
    });
  }

  /**
   * 
   * @param updatedLink The updated link to save
   */
  updateLink(updatedLink: CharacterLink) {
    this.firestore
      .collection(this.collectionName)
      .doc(updatedLink.id)
      .update(updatedLink);
  }

  /**
   * 
   * @param linkId The ID of the link to delete
   */
  deleteLink(linkId: string) {
    this.firestore.collection(this.collectionName).doc(linkId).delete();
  }
}
