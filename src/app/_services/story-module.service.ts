import { Injectable } from '@angular/core';
import { StoryModule } from '../_interfaces/story-module';

@Injectable({
  providedIn: 'root'
})
export class StoryModuleService {
  storyModulesList: StoryModule[] = [
    {
      id: 1,
      type: 'text',
      content: 'This is the first module of the first story',
      appearance: 'normal',
      color: '#000000'
    },
    {
      id: 2,
      type: 'image',
      content: 'https://i.imgur.com/x32syYD.jpeg',
      appearance: 'normal',
      color: '#000000'
    },
    {
      id: 3,
      type: 'text',
      content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      appearance: 'bold',
      color: '#ff0000'
    },
    {
      id: 4,
      type: 'text',
      content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      appearance: 'italic',
      color: '#00ff00'
    },
    {
      id: 5,
      type: 'text',
      content: 'Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.',
      appearance: 'underlined',
      color: '#f0000f'
    },
    {
      id: 6,
      type: 'image',
      content: 'https://i.imgur.com/cT2n0HB.jpeg',
      appearance: 'normal',
      color: '#000000'
    }
  ]

  constructor() { }

  /**
   *
   * @returns All story modules in the storyModulesList
   */
  getAllStoryModules(): StoryModule[] {
    return this.storyModulesList;
  }

  /**
   *
   * @param id ID of the story module to get
   * @returns The story module with the given ID
   */
  getStoryModuleById(id: number): StoryModule | undefined {
    return this.storyModulesList.find(module => module.id === id);
  }
}
