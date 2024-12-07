import { Injectable } from '@angular/core';
import { Character } from '../_interfaces/character';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  private collectionName = 'characters'; // collection name in Firebase

  constructor(private firestore: AngularFirestore) {}

  getAllCharacters(): Observable<Character[]> {
    //return this.characterList;
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
        // Transform the data into a World object with the correct type
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
}
