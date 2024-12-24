import { Injectable } from '@angular/core';
import { Story } from '../_interfaces/story';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { arrayUnion } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class StoryService {
  private collectionName = 'stories'; // collection name in Firebase

  constructor(private firestore: AngularFirestore) {}

  /**
   *
   * @returns All stories in the storyList
   */
  getAllStories(): Observable<Story[]> {
    return this.firestore
      .collection(this.collectionName)
      .valueChanges({ idField: 'id' })
      .pipe(
        map((data: any[]) => {
          return data.map((data: any) => {
            const story: Story = {
              id: data.id,
              ownerId: data.ownerId,
              title: data.title,
              characterIds: data.characterIds,
              moduleIds: data.moduleIds,
              previousId: data.previousId,
              nextId: data.nextId,
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
    return this.firestore
      .collection(this.collectionName)
      .doc(id)
      .valueChanges()
      .pipe(
        map((data: any) => {
          const story: Story = {
            id: data.id,
            ownerId: data.ownerId,
            title: data.title,
            characterIds: data.characterIds,
            moduleIds: data.moduleIds,
            previousId: data.previousId,
            nextId: data.nextId,
          };
          return story;
        })
      );
  }

  /**
     *
     * @param newStory The new Story to create
     * @param worldId The ID of the world to add this Story to
     */
  createNewStory(newStory: Story, worldId: string) {
    const newDoc = this.firestore
      .collection(this.collectionName)
      .add(newStory);

    newDoc.then((docRef) => {
      docRef.update({ id: docRef.id });
      // update world with ID to add this character to placeIds
      this.firestore
        .collection('worlds')
        .doc(worldId)
        .update({
          storyIds: arrayUnion(docRef.id),
        });
    });
  }

  /**
     *
     * @param updatedStory The updated Story to save to Firestore
     */
  updateStory(updatedStory: Story) {
    this.firestore
      .collection(this.collectionName)
      .doc(updatedStory.id)
      .update(updatedStory);
  }

  /**
     *
     * @param storyId The ID of the story to delete
     */
  async deleteStory(storyId: string) {
    // delete moduleIds of this story
    // TODO: fix this soon lol
    // const doc = await this.firestore.collection(this.collectionName).doc(storyId).get().toPromise();
    // const moduleIds = (doc!.data() as any).moduleIds;
    // // delete all modules in this story
    // for (const moduleId of moduleIds) {
    //   await this.firestore.collection('modules').doc(moduleId).delete();
    // }

    // find any stories that have this story as their previousId and update their previousId to null
    const querySnapshotPrev = await this.firestore.collection(this.collectionName).get().toPromise();
    querySnapshotPrev!.forEach(async (doc) => {
      const data: any = doc.data();
      if (data.previousId === storyId) {
      await this.firestore.collection(this.collectionName).doc(doc.id).update({ previousId: null });
      }
    });

    // find any stories that have this story as their nextId and update their nextId to null
    const querySnapshotNext = await this.firestore.collection(this.collectionName).get().toPromise();
    querySnapshotNext!.forEach(async (doc) => {
      const data: any = doc.data();
      if (data.nextId === storyId) {
      await this.firestore.collection(this.collectionName).doc(doc.id).update({ nextId: null });
      }
    });
    
    this.firestore.collection(this.collectionName).doc(storyId).delete();
  }
}
