import { Injectable } from '@angular/core';
import { Story } from '../_interfaces/story';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  private collectionName = 'stories'; // collection name in Firebase

  constructor(private firestore: AngularFirestore) {}

  /**
   *
   * @returns All stories in the storyList
   */
  getAllStories(): Observable<Story[]> {
    return this.firestore.collection(this.collectionName).valueChanges({ idField: 'id' }).pipe(
      map((data: any[]) => {
        return data.map((data: any) => {
          const story: Story = {
            id: data.id,
            title: data.title,
            characterIds: data.characterIds,
            moduleIds: data.moduleIds,
            previousId: data.previousId,
            nextId: data.nextId
          };
          return story;
        });
      })
    );
  }

  /**
   *
   * @param id ID of the story to get
   * @returns The story with the given ID
   */
  getStoryById(id: string): Observable<Story> {
    return this.firestore.collection(this.collectionName).doc(id).valueChanges().pipe(
      map((data: any) => {
        const story: Story = {
          id: data.id,
          title: data.title,
          characterIds: data.characterIds,
          moduleIds: data.moduleIds,
          previousId: data.previousId,
          nextId: data.nextId
        };
        return story;
      })
    );
  }
}
