using System.Collections.Generic;
using System.Text.Json;

namespace Scraper.RP;
public partial class Fog {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Doc"></param>
    /// <param name="Receiver"></param>
    public static void Convert(JsonDocument Doc, List<Fog> Receiver) {
        JsonElement Root = Doc.RootElement;
        JsonElement id = Root.GetProperty("minecraft:fog_settings").GetProperty("description").GetProperty("identifier");

        var Out = new Fog {
            ID = id.GetString()
        };

        Receiver.Add(Out);
    }
}
