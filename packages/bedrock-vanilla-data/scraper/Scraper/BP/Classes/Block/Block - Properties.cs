using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Scraper.BP;
public partial class Block : IIdentifier {
    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("id")]
    public String ID { get; set; }

    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("properties")]
    public List<String> Properties { get; set; }
}
