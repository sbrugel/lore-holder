/**
 * Interface for a link between two characters
 */
export interface CharacterLink {
    /**
     * The ID of the link
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
     * Character ID link start
     */
    fromId: string;

    /**
     * Character ID link to
     */
    toId: string;

    /**
     * More details on the association
     */
    details: string | null;

    /**
     * The type of relationship
     */
    relationType: 'friend' | 'enemy' | 'family' | 'lover' | 'other';
}
