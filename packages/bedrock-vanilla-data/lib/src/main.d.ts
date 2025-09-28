import { MinecraftDataSet } from "./Lib/Types/MinecraftDataSet";
import { Vanilla, Edu, Types, General as G } from "./Lib/";
export { MinecraftDataSet, Vanilla, Edu, Types };
/**The minecraft vanilla data of RP and BP data*/
export declare namespace MinecraftData {
    /**The vanilla data set*/
    const vanilla: MinecraftDataSet;
    /**The education data set*/
    const edu: MinecraftDataSet;
    /**The generalized data set for minecraft*/
    namespace General {
        /** A list of biomes */
        const Biomes: string[];
        /** The summarized data set for blocks*/
        const Blocks: G.GeneralBlock;
        /** A list of camera presets */
        const CameraPresets: string[];
        /** A list of cooldown categories */
        const CooldownCategory: string[];
        /** A list of dimensions */
        const Dimensions: string[];
        /** The summarized data set of effects*/
        const Effects: string[];
        /** The summarized data set for entities*/
        const Entities: G.GeneralEntity;
        /** A list of enchantments */
        const Enchantments: string[];
        /** Data for the potions */
        const Potions: {
            Effects: string[];
            Types: string[];
            Modifiers: string[];
        };
    }
    /**Access to behaviorpack vanilla data*/
    namespace BehaviorPack {
        /**Gets the biome by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getBiome(id: string, edu?: boolean): Types.BehaviorPack.Biome | undefined;
        /**Gets the block by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getBlock(id: string, edu?: boolean): Types.BehaviorPack.Block | undefined;
        /**Gets the block state by the given identification
         * @param id The block state id
         * @returns A object with the specified id or undefined if nothing was found*/
        function getBlockState(id: string): Types.BehaviorPack.BlockState | undefined;
        /**Gets the entity by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getEntity(id: string, edu?: boolean): Types.BehaviorPack.Entity | undefined;
        /**Gets the item by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getItem(id: string, edu?: boolean): Types.BehaviorPack.Item | undefined;
        /**Gets the loot table by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getLootTable(id: string, edu?: boolean): Types.BehaviorPack.LootTable | undefined;
        /**Gets the loot table by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getFeature(id: string, edu?: boolean): Types.BehaviorPack.Feature | undefined;
        /**Gets the trading by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getTrading(id: string, edu?: boolean): Types.BehaviorPack.Trading | undefined;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasBiome(id: string, edu?: boolean): boolean;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasBlock(id: string, edu?: boolean): boolean;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasEntity(id: string, edu?: boolean): boolean;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasItem(id: string, edu?: boolean): boolean;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasLootTable(id: string, edu?: boolean): boolean;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasTrading(id: string, edu?: boolean): boolean;
    }
    /**Access to resourcepack vanilla data*/
    namespace ResourcePack {
        /**Gets the animation controller by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getAnimationController(id: string, edu?: boolean): Types.ResourcePack.AnimationController | undefined;
        /**Gets the animation by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getAnimation(id: string, edu?: boolean): Types.ResourcePack.Animation | undefined;
        /**Gets the animation controller by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getEntity(id: string, edu?: boolean): Types.ResourcePack.Entity | undefined;
        /**Gets the fog by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getFog(id: string, edu?: boolean): Types.ResourcePack.Fog | undefined;
        /**Gets the material by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getMaterial(id: string, edu?: boolean): Types.ResourcePack.Material | undefined;
        /**Gets the model by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getModel(id: string, edu?: boolean): Types.ResourcePack.Model | undefined;
        /**Gets the particle by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getParticle(id: string, edu?: boolean): Types.ResourcePack.Particle | undefined;
        /**Gets the render controller by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getRenderController(id: string, edu?: boolean): Types.ResourcePack.RenderController | undefined;
        /**Gets the sound by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getSound(id: string, edu?: boolean): Types.ResourcePack.Sound | undefined;
        /**Gets the sound file by the given identification
         * @param file The filename of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getSoundFile(file: string, edu?: boolean): string | undefined;
        /**Gets the texture by the given identification
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function getTexture(id: string, edu?: boolean): Types.ResourcePack.Texture | undefined;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasAnimationController(id: string, edu?: boolean): boolean;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasAnimation(id: string, edu?: boolean): boolean;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasEntity(id: string, edu?: boolean): boolean;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasFog(id: string, edu?: boolean): boolean;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasMaterial(id: string, edu?: boolean): boolean;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasModel(id: string, edu?: boolean): boolean;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasParticle(id: string, edu?: boolean): boolean;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasRenderController(id: string, edu?: boolean): boolean;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasSound(id: string, edu?: boolean): boolean;
        /**Returns true or false if the given file exists
         * @param file The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasSoundFile(file: string, edu?: boolean): boolean;
        /**Returns true or false if the given identification exists
         * @param id The identification of the object to find
         * @param edu Whether or not to include education data
         * @returns A object with the specified id or undefined if nothing was found*/
        function hasTexture(id: string, edu?: boolean): boolean;
    }
}
