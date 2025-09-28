using System;
using System.Collections.Generic;
using System.IO;
using System.Text.Json;

namespace Scraper.RP;
public partial class Sound {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="Pack"></param>
    /// <param name="Receiver"></param>
    public static void Convert(String Pack, List<Sound> Receiver, List<String> SoundFiles) {
        String Filepath = Path.Join(Pack, "sounds", "sound_definitions.json");

        JsonDocument Doc = Json.GetDoc(Filepath);

        if (Doc is null) {
            return;
        }

        if (Doc.RootElement.TryGetProperty("sound_definitions", out JsonElement Definitions)) {
            foreach (JsonProperty Def in Definitions.EnumerateObject()) {
                var Item = new Sound() {
                    ID = Def.Name
                };

                Receiver.Add(Item);

                if (Def.Value.TryGetProperty("sounds", out JsonElement Sounds)) {
                    ConvertSounds(Sounds, SoundFiles);
                }
            }
        }
    }

    private static void ConvertSounds(JsonElement sounds, List<String> soundfiles) {
        // It should be an list of string or object with name being the path
        if (sounds.ValueKind != JsonValueKind.Array) {
            return;
        }

        foreach (JsonElement item in sounds.EnumerateArray()) {
            switch (item.ValueKind) {
                case JsonValueKind.Object:
                    if (item.TryGetProperty("name", out JsonElement name)) {
                        if (name.ValueKind == JsonValueKind.String) {
                            soundfiles.Add(name.GetString());
                        }
                    }
                    break;
                case JsonValueKind.String:
                    soundfiles.Add(item.GetString());
                    break;
            }
        }
    }
}
