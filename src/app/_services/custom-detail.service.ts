import { Injectable } from '@angular/core';
import { CustomDetail } from '../_interfaces/custom-detail';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';
import { arrayUnion } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class CustomDetailService {
  private collectionName = 'customDetails'; // collection name in Firebase

  constructor(private firestore: AngularFirestore) {}

  /**
   *
   * @returns All custom details
   */
  getAllCustomDetails(): Observable<CustomDetail[]> {
    return this.firestore
      .collection(this.collectionName)
      .valueChanges({ idField: 'id' })
      .pipe(
        map((data: any[]) => {
          return data.map((data: any) => {
            const customDetail: CustomDetail = {
              id: data.id,
              ownerId: data.ownerId,
              inputType: data.inputType,
              name: data.name,
              contents: data.contents,
              listContents: data.listContents,
              expansionPanel: data.expansionPanel,
            };
            return customDetail;
          });
        })
      );
  }

  /**
   *
   * @param id The ID of the custom detail to get
   * @returns The custom detail with the given ID, or undefined if not found
   */
  getCustomDetailById(id: string): Observable<CustomDetail> {
    return this.firestore
      .collection(this.collectionName)
      .doc(id)
      .valueChanges()
      .pipe(
        map((data: any) => {
          const customDetail: CustomDetail = {
            id: data.id,
            ownerId: data.ownerId,
            inputType: data.inputType,
            name: data.name,
            contents: data.contents,
            listContents: data.listContents,
            expansionPanel: data.expansionPanel,
          };
          return customDetail;
        })
      );
  }

  /**
   *
   * @param customDetail The custom detail to add
   * @param objectId The ID of the character OR place to add this detail to
   * @param collectionName The collection name to add this detail to (default is 'characters')
   */
  createNewCustomDetail(newDetail: CustomDetail, objectId: string, collectionName='characters') {
    const newDoc = this.firestore
      .collection(this.collectionName)
      .add(newDetail);
    
    newDoc.then((docRef) => {
      docRef.update({ id: docRef.id });
      // update char with ID to add this detail to detailIds
      this.firestore
        .collection(collectionName)
        .doc(objectId)
        .update({
          detailIds: arrayUnion(docRef.id),
        });
    });
  }

  /**
   *
   * @param id The ID of the custom detail to update
   * @param updatedDetail The updated custom detail
   */
  updateCustomDetail(updatedDetail: CustomDetail) {
    this.firestore
      .collection(this.collectionName)
      .doc(updatedDetail.id)
      .update(updatedDetail);
  }

  /**
   *
   * @param id The ID of the custom detail to delete
   */
  deleteCustomDetail(id: string) {
    this.firestore
      .collection(this.collectionName)
      .doc(id)
      .delete();
  }
}
