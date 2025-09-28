using System;
using System.Collections.Generic;
using System.Text.Json;

namespace Scraper.BP;
public partial class Block {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Doc"></param>
    /// <param name="Receiver"></param>
    public static void Convert(JsonDocument Doc, List<Block> Receiver) {
        JsonElement Root = Doc.RootElement;

        JsonElement Def = Root.GetProperty("minecraft:block");
        JsonElement Desc = Def.GetProperty("description");

        String ID = Desc.GetProperty("identifier").GetString();
        if (String.IsNullOrWhiteSpace(ID)) {
            return;
        }
        var Out = new Block {
            ID = ID
        };
        Receiver.Add(Out);

        if (Desc.TryGetProperty("properties", out JsonElement properties)) {
            foreach (JsonProperty Item in properties.EnumerateObject()) {
                var State = new BlockState {
                    Name = Item.Name
                };

                foreach (JsonElement Value in Item.Value.EnumerateArray()) {
                    String Temp = Value.GetString();

                    State.Values.Add(Temp);
                }
            }
        }
    }
}
