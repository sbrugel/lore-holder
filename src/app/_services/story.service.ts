import { Injectable } from '@angular/core';
import { Story } from '../_interfaces/story';

@Injectable({
  providedIn: 'root'
})
export class StoryService {
  storyList: Story[] = [
    {
      id: 1,
      title: 'Chapter 1',
      characterIds: [3],
      moduleIds: [1, 2],
      previousId: null,
      nextId: 2
    },
    {
      id: 2,
      title: 'Chapter 2',
      characterIds: [1, 3],
      moduleIds: [3],
      previousId: 1,
      nextId: null
    },
    {
      id: 3,
      title: 'Chapter 3',
      characterIds: [2],
      moduleIds: [4, 5, 6],
      previousId: null,
      nextId: null
    }
  ]

  constructor() { }

  /**
   *
   * @returns All stories in the storyList
   */
  getStories(): Story[] {
    return this.storyList;
  }

  /**
   *
   * @param id ID of the story to get
   * @returns The story with the given ID
   */
  getStory(id: number): Story | undefined {
    return this.storyList.find(story => story.id === id);
  }
}
