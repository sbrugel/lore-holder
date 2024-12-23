/**
 * Interface for a story within a world
 */
export interface Story {
    /**
     * Story ID
     */
    id: string;
    
    /**
     * The user who owns this
     */
    ownerId: string;

    /**
     * Title of the story
     */
    title: string;

    /**
     * IDs of characters in the story. Effectively a tag system
     */
    characterIds: string[];

    /**
     * IDs of modules in the story
     */
    moduleIds: string[];

    /**
     * The ID of the previous story in the sequence
     */
    previousId: string | null;

    /**
     * The ID of the next story in the sequence
     */
    nextId: string | null;
}
