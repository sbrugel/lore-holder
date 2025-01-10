/**
 * Interface for a place within a world
 */
export interface Place {
    /**
     * The place ID
     */
    id: string;
    
    /**
     * The user who owns this
     */
    ownerId: string;
    
    /**
     * The date of creation for this object
     */
    creationDate: Date;

    /**
     * The place name
     */
    name: string;

    /**
     * The place description (brief)
     */
    description: string | null;

    /**
     * The place population
     */
    population: number | null;

    /**
     * The more detailed info of the place
     */
    about: string | null;

    /**
     * The character IDs of characters that are from this place
     */
    characterIds: string[];

    /**
     * The detail IDs of custom details for this place
     */
    detailIds: string[];
}