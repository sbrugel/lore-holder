import { Injectable } from '@angular/core';
import { StoryModule } from '../_interfaces/story-module';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoryModuleService {
  private collectionName = 'storyModules'; // collection name in Firebase

  constructor(private firestore: AngularFirestore) {}

  /**
   *
   * @returns All story modules in the storyModulesList
   */
  getAllStoryModules(): Observable<StoryModule[]> {
    return this.firestore
      .collection(this.collectionName)
      .valueChanges({ idField: 'id' })
      .pipe(
        map((data: any[]) => {
          return data.map((data: any) => {
            const storyModule: StoryModule = {
              id: data.id,
              ownerId: data.ownerId,
              type: data.type,
              content: data.content,
              appearance: data.appearance,
              color: data.color,
            };
            return storyModule;
          });
        })
      );
  }

  /**
   *
   * @param id ID of the story module to get
   * @returns The story module with the given ID
   */
  getStoryModuleById(id: string): Observable<StoryModule> {
    return this.firestore
      .collection(this.collectionName)
      .doc(id)
      .valueChanges()
      .pipe(
        map((data: any) => {
          const storyModule: StoryModule = {
            id: data.id,
            ownerId: data.ownerId,
            type: data.type,
            content: data.content,
            appearance: data.appearance,
            color: data.color,
          };
          return storyModule;
        })
      );
  }
}
