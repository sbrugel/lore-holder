/**
 * Interface for a module within a story, containing text or an image
 */
export interface StoryModule {
    /**
     * ID of the module
     */
    id: string;
    
    /**
     * The user who owns this
     */
    ownerId: string;

    /**
     * Type of the module
     */
    type: 'text' | 'image';

    /**
     * If text, the content of the module to be shown
     * 
     * If image, the URL of the image to be shown
     */
    content: string;

    /**
     * If text, how it should be displayed. i.e. bold, italic, underlined
     * 
     * Not applicable to images
     */
    appearance: 'bold' | 'italic' | 'underlined' | 'normal';

    /**
     * If text, the color of the text
     * 
     * Not applicable to images
     */
    color: string | null;
}
