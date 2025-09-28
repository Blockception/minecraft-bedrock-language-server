using System;
using System.Text.Json;
using System.Text.Json.Serialization;

namespace Scraper.Converters;
///DOLATER <summary>add description for class: IDToStringConverter</summary>
public partial class IDToStringConverter<T> : JsonConverter<T>
    where T : IIdentifier, new() {

    /// <summary>
    /// 
    /// </summary>
    /// <param name="reader"></param>
    /// <param name="typeToConvert"></param>
    /// <param name="options"></param>
    /// <returns></returns>
    public override T Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options) {
        var Out = new T {
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
    public override void Write(Utf8JsonWriter writer, T value, JsonSerializerOptions options) {
        writer.WriteStringValue(value.ID);
    }
}
