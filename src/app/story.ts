/**
 * Interface for a story within a world
 */
export interface Story {
    /**
     * Story ID
     */
    id: number;

    /**
     * ID of the world this story belongs to
     */
    worldId: number;

    /**
     * Title of the story
     */
    title: string;

    /**
     * IDs of characters in the story. Effectively a tag system
     */
    characterIds: number[];

    /**
     * IDs of the text/image modules in this story, in order
     */
    moduleIds: number[];

    /**
     * The ID of the previous story in the sequence
     */
    previousId: Story | null;

    /**
     * The ID of the next story in the sequence
     */
    nextId: Story | null;
}
