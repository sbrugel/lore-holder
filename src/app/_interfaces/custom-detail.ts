/**
 * Interface for a custom made character detail
 */
export interface CustomDetail {
    /**
     * The ID of this detail object
     */
    id: number;

    /**
     * The character ID this detail is associated with
     */
    characterId: number;

    /**
     * The type of detail
     */
    inputType: 'short' | 'long' | 'list';

    /**
     * Name of the detail
     */
    name: string;

    /**
     * Contents of the detail
     * 
     * Use array for the list type, otherwise string
     */
    contents: string | string[];

    /**
     * If it is a collapsable detail (if true, will be hidden by default)
     */
    expansionPanel: boolean;
}
