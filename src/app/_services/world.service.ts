import { Injectable } from '@angular/core';
import { World } from '../_interfaces/world';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class WorldService {
  // worldList: World[] = [
  //   {
  //     id: 1,
  //     name: 'Earth',
  //     description: 'My first world!',
  //     detailedDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     imageUrl: null,
  //     color: '0000ff',
  //     characterIds: [1, 3],
  //     placeIds: [1, 2],
  //     storyIds: [1, 2],
  //   },
  //   {
  //     id: 2,
  //     name: 'Mars',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     detailedDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     imageUrl: 'https://i.imgur.com/dR8gBzD.jpeg',
  //     color: 'ff0000',
  //     characterIds: [2],
  //     placeIds: [],
  //     storyIds: [3],
  //   },
  //   {
  //     id: 3,
  //     name: 'Cat world',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     detailedDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     imageUrl: 'https://i.imgur.com/Gq4jb0x.png',
  //     color: '00ff00',
  //     characterIds: [],
  //     placeIds: [],
  //     storyIds: [],
  //   },
  //   {
  //     id: 4,
  //     name: 'Cat world',
  //     description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     detailedDescription: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum. Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
  //     imageUrl: 'https://i.discogs.com/fVP0SuOknUADW9xFscgdW-0PEh4q6C61GsdbRFtyqjQ/rs:fit/g:sm/q:90/h:384/w:600/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9BLTEwMDMt/MTYyMjMwMTM0My05/NzI3LmpwZWc.jpeg',
  //     color: '00ff00',
  //     characterIds: [],
  //     placeIds: [],
  //     storyIds: [],
  //   },
  // ];

  private collectionName = 'worlds'; // collection name in Firebase

  constructor(private firestore: AngularFirestore) {}

  /**
   *
   * @returns All worlds in the worldList
   */
  getAllWorlds(): Observable<World[]> {
    return this.firestore.collection(this.collectionName).valueChanges({ idField: 'id' }).pipe(
      map((data: any[]) => {
        return data.map((data: any) => {
          const world: World = {
            id: data.id,
            name: data.name,
            description: data.description,
            detailedDescription: data.detailedDescription,
            imageUrl: data.imageUrl,
            color: data.color,
            characterIds: data.characterIds || [],
            placeIds: data.placeIds || [],
            storyIds: data.storyIds || []
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
    return this.firestore.collection(this.collectionName).doc(id).valueChanges().pipe(
      map((data: any) => {
        // Transform the data into a World object with the correct type
        const world: World = {
          id: data.id,
          name: data.name,
          description: data.description,
          detailedDescription: data.detailedDescription,
          imageUrl: data.imageUrl,
          color: data.color,
          characterIds: data.characterIds || [],
          placeIds: data.placeIds || [],
          storyIds: data.storyIds || []
        };
        return world;
      })
    );
  }
}
