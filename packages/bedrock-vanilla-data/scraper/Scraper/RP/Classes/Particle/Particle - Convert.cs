using System.Collections.Generic;
using System.Text.Json;

namespace Scraper.RP;
public partial class Particle {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Doc"></param>
    /// <param name="Receiver"></param>
    public static void Convert(JsonDocument Doc, List<Particle> Receiver) {
        JsonElement Root = Doc.RootElement;
        JsonElement id = Root.GetProperty("particle_effect").GetProperty("description").GetProperty("identifier");

        var Out = new Particle {
            ID = id.GetString()
        };

        Receiver.Add(Out);
    }
}
