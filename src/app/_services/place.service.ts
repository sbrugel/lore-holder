import { Injectable } from '@angular/core';
import { Place } from '../_interfaces/place';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

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
            characterIds: data.characterIds,
          };
          return place;
        })
      );
  }
}
