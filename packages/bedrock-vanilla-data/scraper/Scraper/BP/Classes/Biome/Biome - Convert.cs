using System;
using System.Collections.Generic;
using System.Text.Json;

namespace Scraper.BP;
public partial class Biome {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Doc"></param>
    /// <param name="Receiver"></param>
    public static void Convert(JsonDocument Doc, List<Biome> Receiver) {
        JsonElement Root = Doc.RootElement;

        JsonElement Def = Root.GetProperty("minecraft:biome");
        JsonElement Desc = Def.GetProperty("description");

        String ID = Desc.GetProperty("identifier").GetString();
        if (String.IsNullOrWhiteSpace(ID)) {
            return;
        }
        var Out = new Biome {
            ID = ID
        };
        Receiver.Add(Out);

        if (Def.TryGetProperty("components", out JsonElement components)) {
            Out.Tags = GetTags(components);
        }
    }

    private static List<String> GetTags(JsonElement components) {
        var result = new List<String>();
        if (!components.TryGetProperty("minecraft:tags", out JsonElement tagsComponent)) {
            return result;
        }
        if (!tagsComponent.TryGetProperty("tags", out JsonElement tags)) {
            return result;
        }

        foreach (JsonElement item in tags.EnumerateArray()) {
            String v = item.GetString();
            if (!String.IsNullOrEmpty(v)) result.Add(v);
        }

        return result;
    }
}

