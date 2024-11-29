/**
 * Interface for a link between two characters
 */
export interface CharacterLink {
    /**
     * Character ID link start
     */
    fromId: number;

    /**
     * Character ID link to
     */
    toId: number;

    /**
     * Title of the association, i.e. "friend" or "nemesis"
     */
    association: string;

    /**
     * More details on the association
     */
    details: string | null;
}
