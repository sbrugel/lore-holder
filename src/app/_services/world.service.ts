import { Injectable } from '@angular/core';
import { World } from '../_interfaces/world';

@Injectable({
  providedIn: 'root',
})
export class WorldService {
  worldList: World[] = [
    {
      id: 1,
      name: 'Earth',
      description: 'My first world!',
      imageUrl: null,
      color: '0000ff',
      ownerId: 1,
      characterIds: [],
      storyIds: [],
    },
    {
      id: 2,
      name: 'Mars',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageUrl: 'https://i.imgur.com/dR8gBzD.jpeg',
      color: 'ff0000',
      ownerId: 1,
      characterIds: [],
      storyIds: [],
    },
    {
      id: 3,
      name: 'Cat world',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageUrl: 'https://i.imgur.com/Gq4jb0x.png',
      color: '00ff00',
      ownerId: 2,
      characterIds: [],
      storyIds: [],
    },
    {
      id: 3,
      name: 'Cat world',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageUrl: 'https://i.imgur.com/Gq4jb0x.png',
      color: '00ff00',
      ownerId: 2,
      characterIds: [],
      storyIds: [],
    },
    {
      id: 3,
      name: 'Cat world',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageUrl: 'https://i.imgur.com/Gq4jb0x.png',
      color: '00ff00',
      ownerId: 2,
      characterIds: [],
      storyIds: [],
    },
    {
      id: 3,
      name: 'Cat world',
      description:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.',
      imageUrl: 'https://i.imgur.com/Gq4jb0x.png',
      color: '00ff00',
      ownerId: 2,
      characterIds: [],
      storyIds: [],
    },
  ];

  constructor() {}

  /**
   *
   * @returns All worlds in the worldList
   */
  getAllWorlds(): World[] {
    return this.worldList;
  }

  /**
   *
   * @param ownerId The ownerId to filter by
   * @returns All worlds in the worldList that have the ownerId
   */
  getAllWorldsForOwner(ownerId: number): World[] {
    return this.worldList.filter((world) => world.ownerId === ownerId);
  }

  /**
   *
   * @param id The id of the world to get
   * @returns The world with the id, or undefined if not found
   */
  getWorldById(id: number): World | undefined {
    return this.worldList.find((world) => world.id === id);
  }
}
