import { Pack } from 'bc-minecraft-bedrock-project';
export declare namespace MinecraftFormat {
    /**
     * Gets the manifest files from the folder
     * @param folder The folder to spit start at looking from
     * @param ignores The glob patterns to ignore
     * @returns
     */
    function GetManifests(folder: string, ignores: string[]): string[];
    /**
     * Gets the behaviorpack files from the folder
     * @param folder The folder to spit start at looking from
     * @param ignores The glob patterns to ignore
     * @returns
     */
    function GetBehaviorPackFiles(folder: string, ignores: string[]): string[];
    /**
     * Gets the resourcepack files from the folder
     * @param folder The folder to spit start at looking from
     * @param ignores The glob patterns to ignore
     * @returns
     */
    function GetResourcePackFiles(folder: string, ignores: string[]): string[];
    /**
     * Retrieves the relevant files located inside the folder of the pack
     * @param pack The pack to get the files from
     * @returns A list of files
     */
    function GetPackFiles(pack: Pack): string[];
    /**
     * Gets the minecraft audio files from the folder
     * @param folder The folder to spit start at looking from
     * @param ignores The glob patterns to ignore
     */
    function GetAudioFiles(folder: string, ignores: string[]): string[];
    /**
     * Gets the minecraft texture files from the folder
     * @param folder The folder to spit start at looking from
     * @param ignores The glob patterns to ignore
     */
    function GetTextureFiles(folder: string, ignores: string[]): string[];
    /**
     * Gets the minecraft structure files from the folder
     * @param folder The folder to spit start at looking from
     * @param ignores The glob patterns to ignore
     */
    function GetStructureFiles(folder: string, ignores: string[]): string[];
}
//# sourceMappingURL=format.d.ts.map