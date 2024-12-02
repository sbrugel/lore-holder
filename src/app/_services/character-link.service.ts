import { Injectable } from '@angular/core';
import { CharacterLink } from '../_interfaces/character-link';

@Injectable({
  providedIn: 'root'
})
export class CharacterLinkService {
  characterLinkList: CharacterLink[] = [
    {
      id: 1,
      fromId: 1,
      toId: 3,
      details: 'They met at the tavern and have been friends ever since.',
      relationType: 'friend'
    },
    {
      id: 2,
      fromId: 3,
      toId: 1,
      details: 'They do not get along and have been enemies for years.',
      relationType: 'enemy'
    },
  ]

  constructor() { }

  /**
   * 
   * @returns All character links
   */
  getCharacterLinks(): CharacterLink[] {
    return this.characterLinkList;
  }

  /**
   * 
   * @param characterId The ID of the link
   * @returns The character link with the given ID or undefined if not found
   */
  getCharacterLinkById(id: number): CharacterLink | undefined {
    return this.characterLinkList.find(characterLink => characterLink.id === id);
  }
}
