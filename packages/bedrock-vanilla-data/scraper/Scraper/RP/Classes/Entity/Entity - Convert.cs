using System;
using System.Collections.Generic;
using System.Text.Json;

namespace Scraper.RP;
public partial class Entity {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Doc"></param>
    /// <param name="Receiver"></param>
    public static void Convert(JsonDocument Doc, List<Entity> Receiver) {
        JsonElement Root = Doc.RootElement;
        JsonElement entity = Root.GetProperty("minecraft:client_entity");
        JsonElement Desc = entity.GetProperty("description");
        JsonElement id = Desc.GetProperty("identifier");

        var Out = new Entity {
            ID = id.GetString()
        };
        Receiver.Add(Out);

        if (Desc.TryGetProperty("animations", out JsonElement Animations)) {
            foreach (JsonProperty anim in Animations.EnumerateObject()) {
                String Anim = anim.Name;

                if (!Out.Animations.Contains(Anim)) {
                    Out.Animations.Add(Anim);
                }
            }
        }
    }
}
