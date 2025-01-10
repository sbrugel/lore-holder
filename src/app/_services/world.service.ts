import { Injectable } from '@angular/core';
import { World } from '../_interfaces/world';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorldService {
  private collectionName = 'worlds'; // collection name in Firebase

  constructor(private firestore: AngularFirestore) {}

  /**
   *
   * @returns All worlds in the worldList
   */
  getAllWorlds(user: any): Observable<World[]> {
    return this.firestore
      .collection(this.collectionName)
      .valueChanges({ idField: 'id' })
      .pipe(
        map((data: any[]) => {
          return data
            .filter((data: any) => data.ownerId === user.uid)
            .map((data: any) => {
              const world: World = {
                id: data.id,
                ownerId: data.ownerId,
                creationDate: data.creationDate,
                name: data.name,
                description: data.description,
                detailedDescription: data.detailedDescription,
                imageUrl: data.imageUrl,
                color: data.color,
                characterIds: data.characterIds || [],
                placeIds: data.placeIds || [],
                storyIds: data.storyIds || [],
              };
              return world;
            });
        })
      );
  }

  /**
   *
   * @param id The id of the world to get
   * @returns The world with the id, or undefined if not found
   */
  getWorldById(id: string): Observable<World> {
    return this.firestore
      .collection(this.collectionName)
      .doc(id)
      .valueChanges()
      .pipe(
        map((data: any) => {
          // Transform the data into a World object with the correct type
          const world: World = {
            id: data.id,
            ownerId: data.ownerId,
            creationDate: data.creationDate,
            name: data.name,
            description: data.description,
            detailedDescription: data.detailedDescription,
            imageUrl: data.imageUrl,
            color: data.color,
            characterIds: data.characterIds || [],
            placeIds: data.placeIds || [],
            storyIds: data.storyIds || [],
          };
          return world;
        })
      );
  }

  /**
   *
   * @param newWorld The world to create in Firestore
   */
  createNewWorld(newWorld: World) {
    const newDoc = this.firestore.collection(this.collectionName).add(newWorld);

    newDoc.then((docRef) => {
      docRef.update({ id: docRef.id });
    });
  }

  /**
   *
   * @param updatedWorld The world to update in Firestore
   */
  updateWorld(updatedWorld: World) {
    this.firestore
      .collection(this.collectionName)
      .doc(updatedWorld.id)
      .update(updatedWorld);
  }

  /**
   *
   * @param id The id of the world to delete
   */
  deleteWorld(id: string) {
    this.firestore.collection(this.collectionName).doc(id).delete();
  }
}
