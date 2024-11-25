import { Character } from "./character";
import { Story } from "./story";
import { Theme } from "./theme";

/**
 * Interface for a world which contains characters and stories
 */
export interface World {
    /**
     * The world ID
     */
    id: number;

    /**
     * The world name
     */
    name: string;

    /**
     * The world description
     */
    description: string | null;

    /**
     * The world image URL
     */
    imageUrl: string | null;

    /**
     * The ID for the theme properties of the world, including color etc.
     */
    theme: number;

    /**
     * The user ID of the world creator/owner
     */
    ownerId: number;

    /**
     * The world's character ids
     */
    characterIds: number[];

    /**
     * The world's story ids
     */
    storyIds: number[];
}
