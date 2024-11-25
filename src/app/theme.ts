/**
 * Interface for a world theme, which contains details for styling of this world's subpages
 */
export interface Theme {
    /**
     * The ID of this theme object
     */
    id: number;

    /**
     * The hex code for primary color code to use
     */
    color: string;
}
