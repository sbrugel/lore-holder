import { Injectable } from '@angular/core';
import { Character } from '../_interfaces/character';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { arrayUnion } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private collectionName = 'characters'; // collection name in Firebase

  constructor(private firestore: AngularFirestore) {}

  getAllCharacters(): Observable<Character[]> {
    return this.firestore.collection(this.collectionName).valueChanges({ idField: 'id' }).pipe(
      map((data: any[]) => {
        return data.map((data: any) => {
          const character: Character = {
            id: data.id,
            name: data.name,
            imageUrl: data.imageUrl,
            description: data.description,
            age: data.age,
            gender: data.gender,
            race: data.race,
            pronouns: data.pronouns,
            about: data.about,
            colors: data.colors,
            galleryLinks: data.galleryLinks,
            detailIds: data.detailIds,
          };
          return character;
        });
      })
    );
  }

  getCharacterById(id: string): Observable<Character> {
    return this.firestore.collection(this.collectionName).doc(id).valueChanges().pipe(
      map((data: any) => {
        const character: Character = {
          id: data.id,
          name: data.name,
          imageUrl: data.imageUrl,
          description: data.description,
          age: data.age,
          gender: data.gender,
          race: data.race,
          pronouns: data.pronouns,
          about: data.about,
          colors: data.colors,
          galleryLinks: data.galleryLinks,
          detailIds: data.detailIds,
        };
        return character;
      })
    );
  }

  /**
   * 
   * @param newCharacter The new character to add to the collection
   */
  createNewCharacter(newCharacter: Character, worldId: string) {
    const newDoc = this.firestore.collection(this.collectionName).add(newCharacter);

    newDoc.then((docRef) => {
      docRef.update({ id: docRef.id });
      // update world with ID to add this character to characterIds
      this.firestore.collection('worlds').doc(worldId).update({
        characterIds: arrayUnion(docRef.id)
      });
    });
  }

  /**
   * 
   * @param updatedCharacter The updated character to save to Firestore
   */
  updateCharacter(updatedCharacter: Character) {
    this.firestore.collection(this.collectionName).doc(updatedCharacter.id).update(updatedCharacter);
  }

  /**
   * 
   * @param characterId The id of the character to delete
   */
  deleteCharacter(characterId: string) {
    this.firestore.collection(this.collectionName).doc(characterId).delete();
  }
}
