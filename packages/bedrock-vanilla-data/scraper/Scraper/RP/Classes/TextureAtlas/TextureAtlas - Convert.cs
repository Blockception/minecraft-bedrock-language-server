using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

namespace Scraper.RP;
public partial class TextureAtlas {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Pack"></param>
    /// <param name="Receiver"></param>
    public static void Convert(String filepath, List<TextureAtlas> Receiver) {
        JsonDocument Doc = Json.GetDoc(filepath);

        if (Doc is null) {
            return;
        }

        if (Doc.RootElement.TryGetProperty("texture_data", out JsonElement Definitions)) {
            foreach (JsonProperty Def in Definitions.EnumerateObject()) {
                var Item = new TextureAtlas() {
                    ID = Def.Name
                };

                Receiver.Add(Item);
            }
        }
    }
}
