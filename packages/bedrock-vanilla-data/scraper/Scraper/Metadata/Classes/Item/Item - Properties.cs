using System;
using System.Text.Json.Serialization;

namespace Scraper.Metadata;

public partial class Item {
    [JsonPropertyName("command_name")]
    public String CommandName { get; set; }

    [JsonPropertyName("name")]
    public String Name { get; set; }

    [JsonPropertyName("raw_id")]
    public Int32 RawID { get; set; }

    [JsonPropertyName("serialization_id")]
    public String SerializationID { get; set; }


    [JsonPropertyName("serialization_name")]
    public String SerializationName { get; set; }
}
