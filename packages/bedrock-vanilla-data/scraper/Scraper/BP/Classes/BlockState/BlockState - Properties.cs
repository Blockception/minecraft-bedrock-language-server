using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Scraper.BP;
public partial class BlockState : INamed {
    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("values")]
    public List<String> Values { get; set; }

    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("name")]
    public String Name { get; set; }

    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("type")]
    public String Type { get; set; }
}
