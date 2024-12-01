/**
 * Interface for a story within a world
 */
export interface Story {
    /**
     * Story ID
     */
    id: number;

    /**
     * Title of the story
     */
    title: string;

    /**
     * IDs of characters in the story. Effectively a tag system
     */
    characterIds: number[];

    /**
     * IDs of modules in the story
     */
    moduleIds: number[];

    /**
     * The ID of the previous story in the sequence
     */
    previousId: number | null;

    /**
     * The ID of the next story in the sequence
     */
    nextId: number | null;
}
