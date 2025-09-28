using System;
using System.Collections.Generic;
using System.Text.Json;

namespace Scraper.BP;
public partial class Item {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Doc"></param>
    /// <param name="Receiver"></param>
    public static void Convert(JsonDocument Doc, List<Item> Receiver) {
        JsonElement Root = Doc.RootElement;

        JsonElement Def = Root.GetProperty("minecraft:item");

        String ID = Def.GetProperty("description").GetProperty("identifier").GetString();

        if (ID != null) {
            var Out = new Item {
                ID = ID
            };

            if (Def.TryGetProperty("components", out JsonElement components)) {
                if (components.TryGetProperty("minecraft:max_damage", out JsonElement value)) {
                    Out.MaxDamage = value.GetInt32();
                }
            }

            Receiver.Add(Out);
        }
    }
}
