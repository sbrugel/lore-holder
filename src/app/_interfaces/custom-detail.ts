/**
 * Interface for a custom made character detail
 */
export interface CustomDetail {
    /**
     * The ID of this detail object
     */
    id: string;
    
    /**
     * The user who owns this
     */
    ownerId: string;

    /**
     * The type of detail
     */
    inputType: 'text' | 'list';

    /**
     * Name of the detail
     */
    name: string;

    /**
     * The content of the detail, if short or long type
     */
    contents: string | null;

    /**
     * If it is a list type, this will be the list of contents
     */
    listContents: string[] | null;

    /**
     * If it is a collapsable detail (if true, will be hidden by default)
     */
    expansionPanel: boolean;
}
