using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Scraper.Metadata;

public partial class Block {
    [JsonPropertyName("name")]
    public String Name { get; set; }

    [JsonPropertyName("properties")]
    public List<BlockProperty> Properties { get; set; }

    [JsonPropertyName("raw_id")]
    public Int32 RawID { get; set; }

    [JsonPropertyName("serialization_id")]
    public String SerializationID { get; set; }


}
