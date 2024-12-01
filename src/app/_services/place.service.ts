import { Injectable } from '@angular/core';
import { Place } from '../_interfaces/place';

@Injectable({
  providedIn: 'root'
})
export class PlaceService {
  placesList: Place[] = [
    {
      id: 1,
      name: 'Wilmington',
      description: 'A city in Delaware',
      population: 72000,
      characterIds: [1]
    },
    {
      id: 2,
      name: 'New York City',
      description: 'A city in New York',
      population: 8400000,
      characterIds: [1, 3]
    }
  ]

  constructor() { }

  getAllPlaces(): Place[] {
    return this.placesList;
  }

  getPlaceById(id: number): Place | undefined {
    return this.placesList.find(place => place.id === id);
  }
}
