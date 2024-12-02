/**
 * Interface for a link between two characters
 */
export interface CharacterLink {
    /**
     * The ID of the link
     */
    id: number;

    /**
     * Character ID link start
     */
    fromId: number;

    /**
     * Character ID link to
     */
    toId: number;

    /**
     * More details on the association
     */
    details: string | null;

    /**
     * The type of relationship
     */
    relationType: 'friend' | 'enemy' | 'family' | 'lover' | 'other';
}
