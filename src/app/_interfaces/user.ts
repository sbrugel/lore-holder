import { World } from "./world";

/**
 * Interface for a user (WIP)
 */
export interface User {
    /**
     * User ID
     */
    id: number;

    /**
     * The worlds created by this user
     */
    worlds: World[];
}
