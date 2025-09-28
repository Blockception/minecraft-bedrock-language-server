using System;
using System.Collections.Generic;
using System.IO;

namespace Scraper.BP;

public partial class Container {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Folder"></param>
    /// <returns></returns>
    public static Container Load(String Folder) {
        var Out = new Container {
            Blocks = Json.LoadEnsure<List<Block>>(Path.Join(Folder, "blocks.json")),
            Biomes = Json.LoadEnsure<List<Biome>>(Path.Join(Folder, "biomes.json")),
            Entities = Json.LoadEnsure<List<Entity>>(Path.Join(Folder, "entities.json")),
            Items = Json.LoadEnsure<List<Item>>(Path.Join(Folder, "items.json")),
            LootTables = Json.LoadEnsure<List<LootTable>>(Path.Join(Folder, "loot_tables.json")),
            Trading = Json.LoadEnsure<List<Trading>>(Path.Join(Folder, "trading.json"))
        };

        return Out;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="Folder"></param>
    public void Save(String Folder) {
        Directory.CreateDirectory(Folder);

        Typescript.SaveArray("Block", "../../Types/BehaviorPack/Block", nameof(this.Blocks), this.Blocks, Path.Join(Folder, "blocks.ts"));
        Typescript.SaveArray("Biome", "../../Types/BehaviorPack/Biome", nameof(this.Biomes), this.Biomes, Path.Join(Folder, "biomes.ts"));
        Typescript.SaveArray("Entity", "../../Types/BehaviorPack/Entity", nameof(this.Entities), this.Entities, Path.Join(Folder, "entities.ts"));
        Typescript.SaveArray("Item", "../../Types/BehaviorPack/Item", nameof(this.Items), this.Items, Path.Join(Folder, "items.ts"));
        Typescript.SaveArray("string", null, nameof(this.LootTables), this.LootTables, Path.Join(Folder, "loot_tables.ts"));
        Typescript.SaveArray("string", null, nameof(this.Trading), this.Trading, Path.Join(Folder, "trading.ts"));
        Typescript.SaveArray("string", null, nameof(this.Features), this.Features, Path.Join(Folder, "features.ts"));
    }
}
