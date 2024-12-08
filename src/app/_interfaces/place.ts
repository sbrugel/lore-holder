/**
 * Interface for a place within a world
 */
export interface Place {
    /**
     * The place ID
     */
    id: string;

    /**
     * The place name
     */
    name: string;

    /**
     * The place description
     */
    description: string | null;

    /**
     * The place population
     */
    population: number | null;

    /**
     * The character IDs of characters that are from this place
     */
    characterIds: string[];
}