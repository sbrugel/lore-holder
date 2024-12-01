import { Injectable } from '@angular/core';
import { CustomDetail } from '../_interfaces/custom-detail';

@Injectable({
  providedIn: 'root'
})
export class CustomDetailService {
  customDetailList: CustomDetail[] = [
    {
      id: 1,
      inputType: 'short',
      name: 'Favorite Color',
      contents: 'Red',
      expansionPanel: false
    },
    {
      id: 2,
      inputType: 'long',
      name: 'About Me',
      contents: 'I am a silly dragon who loves to play and have fun. I am a bit of a troublemaker, but I have a good heart.',
      expansionPanel: true
    },
    {
        id: 3,
        inputType: 'list',
        name: 'Deets',
        contents: ['bleh', 'blah', 'bloo'],
        expansionPanel: false
    }
  ]

  constructor() { }

  /**
   * 
   * @returns All custom details
   */
  getAllCustomDetails(): CustomDetail[] {
    return this.customDetailList;
  }

  /**
   * 
   * @param id The ID of the custom detail to get
   * @returns The custom detail with the given ID, or undefined if not found
   */
  getCustomDetailById(id: number): CustomDetail | undefined {
    return this.customDetailList.find(customDetail => customDetail.id === id);
  }
}
