import { Injectable } from '@angular/core';
import { Character } from '../_interfaces/character';

@Injectable({
  providedIn: 'root'
})
export class CharacterService {
  characterList: Character[] = [
    {
      id: 1,
      name: 'Lagoon',
      imageUrl: 'https://i.imgur.com/HS7zBTi.png',
      description: 'A silly dragon :D',
      age: 22,
      gender: 'Male',
      race: 'Dragon',
      pronouns: 'he/they',
      about: 'Lagoon is a silly dragon who loves to play and have fun. He is a bit of a troublemaker, but he has a good heart.',
      colors: ['#ff0000', '#00ff00', '#0000ff'],
      galleryLinks: []
    },
    {
      id: 2,
      name: 'Erin',
      imageUrl: 'https://i.imgur.com/su0cVnH.png',
      description: 'A serious dragon :D',
      age: 25,
      gender: 'Female',
      race: 'Dragon',
      pronouns: 'she/her',
      about: 'Erin is a serious dragon who is always focused on her work. She is very responsible and always gets the job done.',
      colors: ['#ff0000', '#00ff00', '#0000ff'],
      galleryLinks: []
    },
    {
      id: 3,
      name: 'Alana',
      imageUrl: 'https://i.imgur.com/541PtAY.png',
      description: 'A chef slug :D',
      age: 45,
      gender: 'Female',
      race: 'Slug',
      pronouns: 'she/her',
      about: 'Alana is a chef slug who loves to cook delicious food. She is very creative and always comes up with new recipes.',
      colors: ['#ff0000', '#00ff00', '#0000ff'],
      galleryLinks: []
    },
  ]

  constructor() { }

  getAllCharacters(): Character[] {
    return this.characterList;
  }

  getCharacterById(id: number): Character | undefined {
    return this.characterList.find(character => character.id === id);
  }
}
