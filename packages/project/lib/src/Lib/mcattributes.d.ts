/**An obect that stores project settings, attributes or other project related definition*/
export interface MCAttributes {
    /**A property definition*/
    [property: string]: string;
}
/**The namespace that provides code for MCAttributes interfaces*/
export declare namespace MCAttributes {
    /**The default filename of a MCAttributes filename*/
    const filename = ".mcattributes";
    /**Creates an empty version of MCAttributes
     * @returns An empty MCAttributes object*/
    function createEmpty(): MCAttributes;
    /**Parses the given content as if its file content, whereby each line is an attribute
     * @param content The content that one would get as in a file
     * @returns A parsed version based on the contents, or an empty object*/
    function parse(content: string): MCAttributes;
    /**Converts the given MCAttributes to file content
     * @param data The MCAttributes data to convert
     * @returns A string represerntation of the contents of a MCAttributes*/
    function toString(data: MCAttributes): string;
    /** Merges the two given objects into a new mcattributes. Whereby B overrides anything A has specified
     * @param items The first data set
     * @returns A new object with the combined attributes*/
    function merge(...items: MCAttributes[]): MCAttributes;
    /**Retrieves the given key from the attributes safely, if non exist an entry is made with the given default value
     * @param attributes The attributes to retrieve the value from
     * @param key The key that stores the specified value
     * @param defaultValue The default value to set*/
    function getOrAdd(attributes: MCAttributes, key: string, defaultValue?: string): string;
    /** Loads the content of the given file into a MCAttributes
     * @param filepath The path to the file to load
     * @returns A filled MCAttributes*/
    function loadSync(filepath: string): MCAttributes;
    /** Loads the content of the given file into a MCAttributes
     * @param filepath The path to the file to load
     * @returns A filled promise that returns a MCAttributes*/
    function load(filepath: string): Promise<MCAttributes>;
    /** Saves the given MCAttributes into the specified file
     * @param data The data to save
     * @param filepath The filepath to save to*/
    function saveSync(data: MCAttributes, filepath: string): void;
    /** Saves the given MCAttributes into the specified file
     * @param data The data to save
     * @param filepath The filepath to save to
     * @returns A promise for when the file will be saved*/
    function save(data: MCAttributes, filepath: string): Promise<void>;
    /**Appends the given property and value into the give file
     * @param filepath The path to the MCAttributes
     * @param property The property key
     * @param value The value of the porerty*/
    function appendSync(filepath: string, property: string, value: string): void;
    /**Appends the given property and value into the give file
     * @param filepath The path to the MCAttributes
     * @param property The property key
     * @param value The value of the porerty
     * @returns A promise for when the file is appended*/
    function append(filepath: string, property: string, value: string): Promise<void>;
}
