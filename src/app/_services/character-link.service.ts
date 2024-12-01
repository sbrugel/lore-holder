import { Injectable } from '@angular/core';
import { CharacterLink } from '../_interfaces/character-link';

@Injectable({
  providedIn: 'root'
})
export class CharacterLinkService {
  characterLinkList: CharacterLink[] = [
    {
      fromId: 1,
      toId: 3,
      details: 'They met at the tavern and have been friends ever since.',
      relationType: 'friend'
    },
    {
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
   * @param characterId The ID of the character to get links for
   * @returns All character links for the given character (from or to)
   */
  getCharacterLinksContaining(characterId: number): CharacterLink[] {
    return this.characterLinkList.filter(x => x.fromId === characterId || x.toId === characterId);
  }
}
