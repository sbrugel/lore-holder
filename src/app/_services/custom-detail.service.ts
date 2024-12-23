import { Injectable } from '@angular/core';
import { CustomDetail } from '../_interfaces/custom-detail';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { map, Observable } from 'rxjs';

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
}
