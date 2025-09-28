/**The interface that collects ignore patterns*/
export interface MCIgnore {
    /**The glob patterns that are used to ignore*/
    patterns: string[];
}
/**The namespace that provides functions for MCIgnore interfaces*/
export declare namespace MCIgnore {
    /**The default filename of a MCIgnore filename*/
    const filename = ".mcignore";
    /**Creates an empty version of MCIgnore
     * @returns An empty MCIgnore object*/
    function createEmpty(): MCIgnore;
    /** Merges the two given objects into a new MCIgnore.
     * @param A The first data set
     * @param B The second data set
     * @returns A new object with the combined patterns*/
    function merge(A: MCIgnore | undefined, B: MCIgnore | undefined): MCIgnore;
    /** Checks wheter or not the given object implements MCIgnore
     * @param value The object to test*/
    function is(value: any): value is MCIgnore;
    /**Parses the given content as if its file content, whereby each line is an pattern
     * @param content The content that one would get as in a file
     * @returns A parsed version based on the contents, or an empty object*/
    function parse(content: string): MCIgnore;
    /**Converts the given MCIgnore to file content
     * @param data The MCIgnore data to convert
     * @returns A string represerntation of the contents of a MCIgnore*/
    function toString(data: MCIgnore): string;
    /** Loads the content of the given file into a MCIgnore
     * @param filepath The path to the file to load
     * @returns A filled MCIgnore*/
    function loadSync(filepath: string): MCIgnore;
    /** Loads the content of the given file into a MCIgnore
     * @param filepath The path to the file to load
     * @returns A filled promise that returns a MCIgnore*/
    function load(filepath: string): Promise<MCIgnore>;
    /** Saves the given MCIgnore into the specified file
     * @param data The data to save
     * @param filepath The filepath to save to*/
    function saveSync(data: MCIgnore, filepath: string): void;
    /** Saves the given MCIgnore into the specified file
     * @param data The data to save
     * @param filepath The filepath to save to
     * @returns A promise for when the file will be saved*/
    function save(data: MCIgnore, filepath: string): Promise<void>;
}
