import { Injectable } from '@angular/core';
import { Place } from '../_interfaces/place';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { arrayUnion } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class PlaceService {
  private collectionName = 'places'; // collection name in Firebase

  constructor(private firestore: AngularFirestore) {}

  getAllPlaces(): Observable<Place[]> {
    return this.firestore
      .collection(this.collectionName)
      .valueChanges({ idField: 'id' })
      .pipe(
        map((data: any[]) => {
          return data.map((data: any) => {
            const place: Place = {
              id: data.id,
              ownerId: data.ownerId,
              name: data.name,
              description: data.description,
              population: data.population,
              about: data.about,
              characterIds: data.characterIds,
            };
            return place;
          });
        })
      );
  }

  getPlaceById(id: string): Observable<Place> {
    return this.firestore
      .collection(this.collectionName)
      .doc(id)
      .valueChanges()
      .pipe(
        map((data: any) => {
          const place: Place = {
            id: data.id,
            ownerId: data.ownerId,
            name: data.name,
            description: data.description,
            population: data.population,
            about: data.about,
            characterIds: data.characterIds,
          };
          return place;
        })
      );
  }

  /**
     *
     * @param newPlace The new place to create
     * @param worldId The ID of the world to add this place to
     */
  createNewPlace(newPlace: Place, worldId: string) {
    const newDoc = this.firestore
      .collection(this.collectionName)
      .add(newPlace);

    newDoc.then((docRef) => {
      docRef.update({ id: docRef.id });
      // update world with ID to add this character to placeIds
      this.firestore
        .collection('worlds')
        .doc(worldId)
        .update({
          placeIds: arrayUnion(docRef.id),
        });
    });
  }

  /**
     *
     * @param updatedPlace The updated Place to save to Firestore
     */
  updatePlace(updatedPlace: Place) {
    this.firestore
      .collection(this.collectionName)
      .doc(updatedPlace.id)
      .update(updatedPlace);
  }

  /**
     *
     * @param placeId The ID of the place to delete
     */
  deletePlace(placeId: string) {
    this.firestore.collection(this.collectionName).doc(placeId).delete();
  }
}
