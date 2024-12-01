/**
 * Interface for a character within a world
 */
export interface Character {
    /**
     * The ID of this character object
     */
    id: number;

    /**
     * Character name
     */
    name: string;

    /**
     * Primary character image link, for use on the cover and thumbnail
     */
    imageUrl: string | null;

    /**
     * A brief description of the character (max 500 characters)
     */
    description: string | null;

    /**
     * Character age
     */
    age: number | null;

    /**
     * Character gender
     */
    gender: string | null;

    /**
     * Character race or species
     */
    race: string | null;

    /**
     * Character pronouns
     */
    pronouns: string | null;

    /**
     * A more detailed description of the character/biography
     */
    about: string | null;

    /**
     * The character's color scheme/palette, can be used for reference when drawing
     */
    colors: string[];

    /**
     * IDs of other images of the character, to be displayed in a carousel format
     */
    galleryLinks: string[];

    /**
     * IDs of custom character details associated
     */
    detailIds: number[];
}
