using System;
using System.Collections.Generic;
using System.Text.Json.Serialization;

namespace Scraper.RP;
public partial class Model : IIdentifier {
    /// <summary>
    /// 
    /// </summary>
    [JsonPropertyName("id")]
    public String ID { get; set; }


    [JsonPropertyName("bones")]
    public List<String> Bones { get; set; } = [];
}
