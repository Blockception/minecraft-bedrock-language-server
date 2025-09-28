using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

namespace Scraper.RP;
public partial class Material {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Pack"></param>
    /// <param name="Receiver"></param>
    public static void Convert(String Pack, List<Material> Receiver) {
        String Folder = Path.Join(Pack, "materials");

        if (!Directory.Exists(Folder)) {
            return;
        }

        String[] Files = Directory.GetFiles(Folder, "*.material", SearchOption.AllDirectories);

        foreach (String Filepath in Files) {
            JsonDocument Doc = Json.GetDoc(Filepath);

            if (Doc is null) {
                continue;
            }

            if (Doc.RootElement.TryGetProperty("materials", out JsonElement Materials)) {
                foreach (JsonProperty Mat in Materials.EnumerateObject()) {
                    if (Mat.Name == "version") { continue; }

                    String ID = Mat.Name;

                    Int32 Index = ID.IndexOf(':');

                    if (Index >= 0) {
                        ID = ID[..Index];
                    }

                    var Item = new Material {
                        ID = ID
                    };

                    Receiver.Add(Item);
                }
            }
        }
    }
}
