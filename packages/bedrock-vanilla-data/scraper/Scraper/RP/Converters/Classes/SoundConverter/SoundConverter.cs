using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Scraper.RP.Converters;
///DOLATER <summary>add description for class: SoundConverter</summary>
public partial class SoundConverter : JsonConverter<Sound> {
    /// <summary>
    /// 
    /// </summary>
    /// <param name="reader"></param>
    /// <param name="typeToConvert"></param>
    /// <param name="options"></param>
    /// <returns></returns>
    public override Sound Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) {
        var Out = new Sound {
            ID = reader.GetString()
        };

        return Out;
    }

    /// <summary>
    /// 
    /// </summary>
    /// <param name="writer"></param>
    /// <param name="value"></param>
    /// <param name="options"></param>
    public override void Write(Utf8JsonWriter writer, Sound value, JsonSerializerOptions options) {
        writer.WriteStringValue(value.ID);
    }
}
