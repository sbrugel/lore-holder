/**
 * Interface for a world which contains characters and stories
 */
export interface World {
    /**
     * The world ID
     */
    id: string;

    /**
     * The world name
     */
    name: string;

    /**
     * The world description (500 character max, displayed in world card)
     */
    description: string | null;

    /**
     * The world detailed description (no character limit, displayed in world details)
     */
    detailedDescription: string | null;

    /**
     * The world image URL
     */
    imageUrl: string | null;

    /**
     * The hex code for primary color code to use
     */
    color: string;

    /**
     * The world's character ids
     */
    characterIds: string[];

    /**
     * The world's place ids
     */
    placeIds: string[];

    /**
     * The world's story ids
     */
    storyIds: string[];
}
