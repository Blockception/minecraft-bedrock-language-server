/**A single definition for MCDefinitions*/
export interface Definition {
    /**The definition that have been defined*/
    defined: string[];
    /**The definition that have to be excluded*/
    excluded: string[];
}
/**The namespace that provides functions for Definitions*/
export declare namespace Definition {
    /**Add the given value to the definition container, checks if value start with '!' to determine if its exclude or not
     * @param container The container to add to
     * @param value The value to add, if its start with '!' its added to the exclude list*/
    function add(container: Definition, value: string): void;
    /**Converts the given container into a text rep for files
     * @param container The container to convert
     * @param key The key each item will be receiving
     * @returns A text rep of the object for files*/
    function toString(container: Definition, key: string): string;
    /**Creates an empty version of the interface Definition
     * @returns A empty version of Definition*/
    function createEmpty(): Definition;
    /** Checks if the given object implements the definition interface
     * @param value The object to inspect
     * @returns Whether or not the object implements Definition*/
    function is(value: any): value is Definition;
}
/**The interface for MCDefinitions*/
export interface MCDefinition {
    /**A collection of items defined and excluded under a given key*/
    [category: string]: Definition;
}
/**The namespace that provides functions for the MCDefinition interface*/
export declare namespace MCDefinition {
    /**The default filename of MCdefinitions*/
    const filename = ".mcdefinitions";
    /**Converts the given contents as if its file contents and returns a MCDefinition object
     * @param content The contents of the given files*/
    function parse(content: string): MCDefinition;
    /**
     *
     * @param data
     * @param category*/
    function getOrAdd(data: MCDefinition, category: string): Definition;
    /**Converts the given MCDefinition object into a file content rep of the object
     * @param data The MCDefinition to convert
     * @returns A text rep of the object*/
    function toString(data: MCDefinition): string;
    /**Creates an empty version of MCDefinition
     * @returns An empty definition of MCDefinition*/
    function createEmpty(): MCDefinition;
    /**Appends the given property and value into the give file
     * @param filepath The path to the MCAttributes
     * @param key The key of the value
     * @param value The value of the porerty
     * @param exclude Whetever or not the exclude the value*/
    function appendSync(filepath: string, key: string, value: string, exclude?: boolean): void;
    /**Appends the given property and value into the give file
     * @param filepath The path to the MCAttributes
     * @param property The property key
     * @param value The value of the porerty
     * @returns A promise for when the file is appended*/
    function append(filepath: string, property: string, value: string): Promise<void>;
    /** Loads the content of the given file into a MCDefinition
     * @param filepath The path to the file to load
     * @returns A filled MCDefinition*/
    function loadSync(filepath: string): MCDefinition;
    /** Loads the content of the given file into a MCDefinition
     * @param filepath The path to the file to load
     * @returns A filled promise that returns a MCDefinition*/
    function load(filepath: string): Promise<MCDefinition>;
    /** Saves the given MCDefinition into the specified file
     * @param data The data to save
     * @param filepath The filepath to save to*/
    function saveSync(data: MCDefinition, filepath: string): void;
    /** Saves the given MCDefinition into the specified file
     * @param data The data to save
     * @param filepath The filepath to save to
     * @returns A promise for when the file will be saved*/
    function save(data: MCDefinition, filepath: string): Promise<void>;
}
